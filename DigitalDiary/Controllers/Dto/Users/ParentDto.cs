using Domain.Entities;

namespace DigitalDiary.Controllers.Dto.Users;

public class ParentDto : UserDto
{
	
}

public static class ParentDtoExtensions
{
	public static ParentDto MapParentToDto(this Parent parent)
	{
		return new ParentDto
		{
			Id = parent.Id,
			FirstName = parent.FirstName,
			LastName = parent.LastName,
			SchoolId = parent.School.Id,
			Email = parent.Email,
			Role = parent.Role
		};
	}
}