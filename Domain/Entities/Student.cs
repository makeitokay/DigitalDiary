using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Students")]
public class Student : User
{
	public Student() : base(Role.Student)
	{
	}
}