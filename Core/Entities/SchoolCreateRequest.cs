using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("SchoolCreateRequests")]
public class SchoolCreateRequest : BaseEntity
{
	[Column("Region")]
	public string Region { get; set; } = default!;
	
	[Column("IsActive")]
	public bool IsActive { get; set; }
}