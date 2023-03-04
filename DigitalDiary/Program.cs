using System.Text;
using Infrastructure;
using Infrastructure.Config;
using Infrastructure.Extensions;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

builder.Configuration.AddEnvironmentVariables(prefix: "DIGITAL_DIARY_");
services.Configure<EmailConfig>(builder.Configuration.GetSection("Email"));

services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddCors(options =>
{
	options.AddPolicy("CORSPolicy", b =>
	{
		b
			.AllowAnyHeader()
			.AllowAnyMethod()
			.WithOrigins("http://localhost:3000");
	});
});

services
	.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidIssuer = Constants.Authentication.Issuer,
			ValidateAudience = true,
			ValidAudience = Constants.Authentication.Audience,
			ValidateLifetime = true,
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("DigitalDiarySecretKey2023")),
			ValidateIssuerSigningKey = true
		};
	});
services
	.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("Default");
services.AddDbContext(connectionString);

services.AddRepositories();

services.AddScoped<IPasswordManager, PasswordManagerStub>();
services.AddScoped<IEmailClient, EmailClientStub>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapGet("/routes", (IEnumerable<EndpointDataSource> endpointSources) =>
    {
	    var sb = new StringBuilder();
	    foreach (var endpoint in endpointSources.SelectMany(es => es.Endpoints))
	    {
		    sb.Append(endpoint.DisplayName + ": ");
 
		    if (endpoint is RouteEndpoint routeEndpoint)
		    { 
			    sb.AppendLine(routeEndpoint.RoutePattern.RawText);
		    }
	    }
	    return sb.ToString();
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();