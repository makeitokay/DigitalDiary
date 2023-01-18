using System.Text;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));

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

app.UseAuthorization();

app.MapControllers();

app.Run();