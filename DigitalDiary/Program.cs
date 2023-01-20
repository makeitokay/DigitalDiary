using System.Text;
using DigitalDiary;
using Infrastructure;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

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
services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));

services.AddRepositories();

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