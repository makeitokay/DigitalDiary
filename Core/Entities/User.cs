using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("Users")]
public class User : BaseEntity
{
	[Column("Name", TypeName = "varchar(50)")]
	[Required]
	public string Name { get; set; } = default!;

	[Column("RoleId")]
	public int RoleId { get; set; }
	
	public Role Role { get; set; } = default!;
	
	public List<Permission> UserPermissions { get; set; } = default!;
}