using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Parents")]
public class Parent : User
{
	public Parent() : base(Role.Parent)
	{
	}
	
	public virtual IEnumerable<Student> Children { get; set; }
	
	public override IEnumerable<Group> GetUserGroups()
	{
		return Children.Select(c => c.Group).Distinct();
	}
}