using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Lessons")]
public class Lesson : BaseEntity
{
	[Column("Date")]
	public DateOnly Date { get; set; }
	[Column("SubjectId")]
	public int SubjectId { get; set; }
	[Column("TeacherId")]
	public int TeacherId { get; set; }
	[Column("GroupId")]
	public int GroupId { get; set; }
	[Column("Order")]
	public int Order { get; set; }
	[Column("Homework")]
	public string Homework { get; set; } = default!;

	public virtual Subject Subject { get; set; } = default!;
	public virtual Teacher Teacher { get; set; } = default!;
	public virtual Group Group { get; set; } = default!;
	public virtual IEnumerable<Mark> Marks { get; set; } = default!;
}