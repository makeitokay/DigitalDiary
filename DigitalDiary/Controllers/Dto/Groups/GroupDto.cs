using System.Runtime.Serialization;

namespace DigitalDiary.Controllers.Dto.Groups;

[DataContract]
public class GroupDto
{
	[DataMember(Name = "Letter")]
	public string Letter { get; set; } = default!;

	[DataMember(Name = "Number")]
	public int Number { get; set; }
}