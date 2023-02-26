using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Marks")]
public class Mark : BaseEntity
{
	[Column("Value")]
	public int? Value { get; set; }
	
	[Column("Attendance")]
	public Attendance? Attendance { get; set; }
	
	[Column("LessonId")]
	public int LessonId { get; set; }
	[Column("StudentId")]
	public int StudentId { get; set; }

	public virtual Lesson Lesson { get; set; } = default!;
	public virtual Student Student { get; set; } = default!;
}

public enum Attendance
{
	Ill,
	Skipped,
	SkippedForGoodReason
}