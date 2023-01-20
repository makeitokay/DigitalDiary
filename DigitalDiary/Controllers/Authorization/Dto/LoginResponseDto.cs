using System.Runtime.Serialization;

namespace DigitalDiary.Controllers.Authorization.Dto;

[DataContract]
public class LoginResponseDto
{
	[DataMember(Name = "accessToken")]
	public string AccessToken { get; set; } = default!;
}