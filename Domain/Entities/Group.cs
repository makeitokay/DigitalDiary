using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Group")]
public class Group : BaseEntity
{
	[Column("Letter")]
	public string Letter { get; set; } = default!;

	[Column("Number")]
	public int Number { get; set; } = default!;

	[Column("SchoolId")]
	public int SchoolId { get; set; } = default!;

	public virtual School School { get; set; } = default!;
}