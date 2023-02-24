using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Users")]
public class User : BaseUser
{
	protected User(Role role)
	{
		Role = role;
	}
	
	[Column("SchoolId")]
	public int SchoolId { get; set; }
	
	public virtual Role Role { get; set; } = default!;
	public virtual School School { get; set; } = default!;
}

[Flags]
public enum Role
{
	Student = 1,
	Teacher = 2,
	Parent = 4,
	SchoolAdmin = 8
}