namespace Infrastructure.Config;

public class EmailConfig
{
	public string SmtpHost { get; set; } = default!;
	public string Username { get; set; } = default!;
	public string Password { get; set; } = default!;
}