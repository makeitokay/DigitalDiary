using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Schools")]
public class School : BaseEntity
{
	[Column("Name")]
	public string Name { get; set; } = default!;
	
	[Column("City")]
	public string City { get; set; } = default!;

	[Column("CreatorEmail")]
	public string CreatorEmail { get; set; } = default!;

	public virtual IEnumerable<User> Users { get; set; } = default!;
}