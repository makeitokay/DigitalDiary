using Domain.Entities;

namespace DigitalDiary.Controllers.Dto.Users;

public class UserDto
{
	public int? Id { get; set; }
	public string FirstName { get; set; } = default!;
	public string LastName { get; set; } = default!;
	public string Email { get; set; } = default!;
	public string Role { get; set; }
}

public static class UserDtoExtensions
{
	public static UserDto MapUserToDto(this User user)
	{
		return new UserDto
		{
			Id = user.Id,
			FirstName = user.FirstName,
			LastName = user.LastName,
			Email = user.Email,
			Role = user.Role.ToString()
		};
	}
}