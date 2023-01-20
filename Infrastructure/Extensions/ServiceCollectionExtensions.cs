using Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
	public static void AddRepositories(this IServiceCollection serviceCollection)
	{
		serviceCollection.AddScoped<IUserRepository, UserRepository>();
	}
}