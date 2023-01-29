using Core.Entities;

namespace Core.Interfaces;

public interface IEmailClient
{
	Task SendUserCreationEmailAsync(User user, string password);
}