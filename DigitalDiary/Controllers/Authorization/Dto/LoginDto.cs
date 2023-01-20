using System.Runtime.Serialization;

namespace DigitalDiary.Controllers.Authorization.Dto;

[DataContract]
public class LoginDto
{
	[DataMember(Name = "email")]
	public string Email { get; set; } = default!;
	
	[DataMember(Name = "password")]
	public string Password { get; set; } = default!;
}