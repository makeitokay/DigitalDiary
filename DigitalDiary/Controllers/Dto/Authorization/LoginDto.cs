namespace DigitalDiary.Controllers.Dto.Authorization;

public class LoginDto
{
	public string Email { get; set; } = default!;
	
	public string Password { get; set; } = default!;
}