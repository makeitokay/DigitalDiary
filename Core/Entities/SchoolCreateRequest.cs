using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("SchoolCreateRequests")]
public class SchoolCreateRequest : BaseEntity
{
	[Column("City")]
	public string City { get; set; } = default!;
	
	[Column("SchoolName")]
	public string SchoolName { get; set; } = default!;
	
	[Column("IsActive")]
	public bool IsActive { get; set; }
	
	[Column("Email")]
	public string CreatorEmail { get; set; } = default!;

	[Column("CreatorFirstName")]
	public string CreatorFirstName { get; set; } = default!;

	[Column("CreatorLastName")]
	public string CreatorLastName { get; set; } = default!;
}