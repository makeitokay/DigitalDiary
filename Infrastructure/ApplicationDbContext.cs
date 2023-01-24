using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure;

public class ApplicationDbContext : DbContext
{
	public DbSet<User> Users => Set<User>();
	public DbSet<Role> Roles => Set<Role>();
	public DbSet<Permission> Permissions => Set<Permission>();
	public DbSet<Admin> Admins => Set<Admin>();
	public DbSet<SchoolCreateRequest> SchoolCreateRequests => Set<SchoolCreateRequest>();

	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		foreach (var entityType in modelBuilder.Model.GetEntityTypes())
		{
			foreach (var property in entityType.GetProperties())
			{
				if (!property.ClrType.IsEnum) continue;
				var type = typeof(EnumToStringConverter<>).MakeGenericType(property.ClrType);
				var converter = Activator.CreateInstance(type, new ConverterMappingHints()) as ValueConverter;

				property.SetValueConverter(converter);
			}
		}
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder
			.UseLazyLoadingProxies();
	}
}