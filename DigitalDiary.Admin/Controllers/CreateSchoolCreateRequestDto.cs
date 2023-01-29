using System.Runtime.Serialization;

namespace DigitalDiary.Admin.Controllers;

[DataContract]
public class CreateSchoolCreateRequestDto
{
	[DataMember(Name = "schoolName")]
	public string SchoolName { get; set; } = default!;
	
	[DataMember(Name = "schoolCity")]
	public string SchoolCity { get; set; } = default!;

	[DataMember(Name = "creatorEmail")]
	public string CreatorEmail { get; set; } = default!;

	[DataMember(Name = "creatorFirstName")]
	public string CreatorFirstName { get; set; } = default!;

	[DataMember(Name = "creatorLastName")]
	public string CreatorLastName { get; set; } = default!;
}