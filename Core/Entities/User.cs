using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("Users")]
public class User : BaseUser
{
	public virtual List<Role> Roles { get; set; } = default!;

	public virtual List<Permission> GranularPermissions { get; set; } = default!;

	public IEnumerable<Permission> GetAllPermissions()
	{
		return Roles
			.SelectMany(r => r.Permissions)
			.Concat(GranularPermissions)
			.Distinct();
	}
}