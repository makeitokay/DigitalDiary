using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Schedule")]
public class Schedule : BaseEntity
{
	[Column("SubjectId")]
	public int SubjectId { get; set; }
	[Column("TeacherId")]
	public int TeacherId { get; set; }
	[Column("GroupId")]
	public int GroupId { get; set; }
	[Column("DayOfWeek")]
	public DayOfWeek DayOfWeek { get; set; }
	[Column("Order")]
	public int Order { get; set; }

	public virtual Subject Subject { get; set; } = default!;
	public virtual Teacher Teacher { get; set; } = default!;
	public virtual Group Group { get; set; } = default!;
}