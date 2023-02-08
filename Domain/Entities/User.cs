using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Users")]
public class User : BaseUser
{
	public virtual Role Role { get; set; } = default!;
}

public enum Role
{
	Student,
	Teacher,
	Parent,
	SchoolAdmin
}