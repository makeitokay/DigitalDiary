using System.Net;
using System.Net.Mail;
using Domain.Entities;
using Infrastructure.Config;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services;

public interface IEmailClient
{
	Task SendUserCreationEmailAsync(User user, string password);
}

public class EmailClient : IEmailClient
{
	private EmailConfig _emailConfig;

	public EmailClient(IOptions<EmailConfig> emailConfig)
	{
		_emailConfig = emailConfig.Value;
	}
	
	public async Task SendUserCreationEmailAsync(User user, string password)
	{
		var subject = "Вас зарегистрировали на DigitalDiary";
		var text = "Здравствуйте!\n" +
		           $"Вас зарегистрировали на DigitalDiary в качестве {GetRoleString(user.Role)}.\n\n" +
		           "Для входа в систему в качестве логина используйте вашу почту. Сгенерированный пароль:\n" +
		           $"{password}\n" +
		           "При первом входе в систему пароль будет необходимо сменить.";
		
		using var smtpClient = new SmtpClient(_emailConfig.SmtpHost)
		{
			Port = 587,
			Credentials = new NetworkCredential(_emailConfig.Username, _emailConfig.Password),
			EnableSsl = true
		};

		await smtpClient.SendMailAsync(
			_emailConfig.Username,
			user.Email,
			subject,
			text);
	}

	private string GetRoleString(Role role) => role switch
	{
		Role.SchoolAdmin => "администратора",
		Role.Student => "ученика",
		Role.Parent => "родителя",
		Role.Teacher => "учителя",
	};
}