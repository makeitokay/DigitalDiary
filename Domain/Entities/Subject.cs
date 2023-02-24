using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Subjects")]
public class Subject : BaseEntity
{
	[Column("SchoolId")]
	public int SchoolId { get; set; }

	public virtual School School { get; set; } = default!;

	[Column("Name")]
	public string Name { get; set; } = default!;
}