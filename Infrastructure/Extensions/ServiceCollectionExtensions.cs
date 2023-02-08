using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
	public static void AddDbContext(this IServiceCollection services, string? connectionString)
	{
		services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
	}

	public static void AddRepositories(this IServiceCollection services)
	{
		services.AddScoped<IUserRepository, UserRepository>();
		services.AddScoped<IDigitalDiaryAdminRepository, DigitalDiaryAdminRepository>();
		services.AddScoped<ISchoolCreateRequestRepository, SchoolCreateRequestRepository>();
		services.AddScoped<ISchoolRepository, SchoolRepository>();
	}
}