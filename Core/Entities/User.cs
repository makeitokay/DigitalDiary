using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Core.Entities;

[Table("Users")]
[Index(nameof(Email), IsUnique = true)]
public class User : BaseEntity
{
	[Column("FirstName")]
	public string FirstName { get; set; } = default!;

	[Column("Email")]
	public string Email { get; set; } = default!;
	
	[Column("PasswordHash")]
	public string PasswordHash { get; set; } = default!;
	
	[Column("PasswordSalt")]
	public byte[] PasswordSalt { get; set; } =default!;

	[Column("RoleId")]
	public int RoleId { get; set; }
	
	public virtual Role Role { get; set; } = default!;
	
	public virtual List<Permission> GranularPermissions { get; set; } = default!;

	public IEnumerable<Permission> GetAllPermissions()
	{
		foreach (var permission in Role.Permissions)
		{
			yield return permission;
		}

		foreach (var permission in GranularPermissions)
		{
			yield return permission;
		}
	}
}