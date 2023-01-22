using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("Permissions")]
public class Permission : BaseEntity
{
	[Column("Category")]
	public string Category { get; set; } = default!;

	[Column("Type")]
	public PermissionType Type { get; set; } = default!;

	public virtual IEnumerable<Role> Roles { get; set; } = default!;

	public virtual IEnumerable<User> Users { get; set; } = default!;
}

public enum PermissionType
{
	CanEditRolePermissions,
	CanEditSchedule,
	CanAddStudents,
	CanAddTeachers
}