namespace Core.Interfaces;

public interface IPasswordManager
{
	string GetPasswordHash(string password, out byte[] salt);
	bool VerifyPassword(string password, string passwordHash, byte[] salt);
	string GenerateRandomPassword();
}