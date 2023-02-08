using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Schools")]
public class School : BaseEntity
{
	[Column("Name")]
	public string Name { get; set; } = default!;
	
	[Column("City")]
	public string City { get; set; } = default!;

	public virtual SchoolAdmin Creator { get; set; } = default!;
}