using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure;

public class ApplicationDbContext : DbContext
{
	public DbSet<User> Users => Set<User>();
	public DbSet<DigitalDiaryAdmin> DigitalDiaryAdmins => Set<DigitalDiaryAdmin>();
	public DbSet<SchoolAdmin> SchoolAdmins => Set<SchoolAdmin>();
	public DbSet<Teacher> Teachers => Set<Teacher>();
	public DbSet<Parent> Parents => Set<Parent>();
	public DbSet<Student> Students => Set<Student>();
	public DbSet<SchoolCreateRequest> SchoolCreateRequests => Set<SchoolCreateRequest>();
	public DbSet<School> Schools => Set<School>();

	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder
			.Entity<User>()
			.HasIndex(u => new { u.Email, u.Role })
			.IsUnique();
		
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

		modelBuilder.Entity<DigitalDiaryAdmin>()
			.HasData(new DigitalDiaryAdmin
			{
				Id = 1,
				Email = "admin@digitaldiary.site",
				PasswordHash =
					"E79B06F60D6344B5CD068D23EB165BA165E616F2CD15473F69CA747B6065911FB18AE463B38B225F68FEB005CA5CAAFDEC548F9DF879EC7C23AC35E9C5CC0E8D",
				PasswordSalt =
					new byte[] { 190, 173, 182, 127, 238, 122, 171, 208, 134, 147, 62, 47, 77, 244, 3, 125 },
				FirstName = "Admin",
				LastName = "Digital Diary"
			});
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder
			.UseLazyLoadingProxies();
	}
}