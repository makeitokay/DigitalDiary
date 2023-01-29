using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("Schools")]
public class School : BaseEntity
{
	[Column("Name")]
	public string Name { get; set; } = default!;
	
	[Column("City")]
	public string City { get; set; } = default!;

	public virtual SchoolCreator Creator { get; set; } = default!;
}