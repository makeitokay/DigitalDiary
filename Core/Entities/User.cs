using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("Users")]
public class User : BaseUser
{
	public virtual Role Role { get; set; } = default!;
}

[Table("SchoolCreators")]
public class SchoolCreator : User
{
}

public enum Role
{
	Student,
	Teacher,
	Parent,
	SchoolAdmin,
	SchoolCreator
}