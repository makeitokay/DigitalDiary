using System.Runtime.Serialization;

namespace DigitalDiary.Controllers.Dto.Authorization;

[DataContract]
public class LoginResponseDto
{
	[DataMember(Name = "accessToken")]
	public string AccessToken { get; set; } = default!;
}