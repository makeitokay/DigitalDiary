using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("Roles")]
public class Role : BaseEntity
{
	[Column("Type")]
	public RoleType Type { get; set; }

	[Column("SchoolId")]
	public int SchoolId { get; set; }
	
	public virtual School School { get; set; } = default!;
	
	public virtual List<Permission> Permissions { get; set; } = default!;

	public virtual List<User> Users { get; set; } = default!;
}

public enum RoleType
{
	Student,
	Teacher,
	Parent,
	Admin,
	SuperAdmin
}