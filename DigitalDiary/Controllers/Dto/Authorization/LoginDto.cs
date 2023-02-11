using System.Runtime.Serialization;

namespace DigitalDiary.Controllers.Dto.Authorization;

[DataContract]
public class LoginDto
{
	[DataMember(Name = "email")]
	public string Email { get; set; } = default!;
	
	[DataMember(Name = "password")]
	public string Password { get; set; } = default!;
}