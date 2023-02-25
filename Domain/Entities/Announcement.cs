using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Announcements")]
public class Announcement : BaseEntity
{
	[Column("SchoolId")]
	public int SchoolId { get; set; }
	[Column("AuthorId")]
	public int AuthorId { get; set; }
	[Column("Header")]
	public string Header { get; set; } = default!;
	[Column("Text")]
	public string Text { get; set; } = default!;
	[Column("Scope", TypeName = "jsonb")]
	public AnnouncementScope Scope { get; set; } = default!;
	[Column("CreatedAtUtc")]
	public DateTimeOffset CreatedAtUtc { get; set; } = DateTimeOffset.UtcNow;

	public virtual School School { get; set; } = default!;
	public virtual User Author { get; set; } = default!;
}

public class AnnouncementScope
{
	public IEnumerable<int>? ForGroups { get; set; }
	public IEnumerable<int>? ForGroupParallels { get; set; }
	public IEnumerable<string>? ForRoles { get; set; }
}