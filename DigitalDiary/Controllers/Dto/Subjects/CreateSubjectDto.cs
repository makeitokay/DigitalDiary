using System.Runtime.Serialization;

namespace DigitalDiary.Controllers.Dto.Subjects;

[DataContract]
public class CreateSubjectDto
{
	[DataMember(Name = "name")]
	public string Name { get; set; } = default!;
}