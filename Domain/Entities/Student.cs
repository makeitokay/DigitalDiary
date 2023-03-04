using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Students")]
public class Student : User
{
	public Student() : base(Role.Student)
	{
	}
	
	[Column("GroupId")]
	public int GroupId { get; set; }

	public virtual Group Group { get; set; }
	public virtual IEnumerable<Parent> Parents { get; set; }
	
	public virtual IEnumerable<Mark> Marks { get; set; }
	
	public override IEnumerable<Group> GetUserGroups()
	{
		yield return Group;
	}
}