using System.Runtime.Serialization;

namespace DigitalDiary.Admin.Controllers;

[DataContract]
public class CreateSchoolCreateRequestDto
{
	[DataMember(Name = "region")]
	public string Region { get; set; }
}