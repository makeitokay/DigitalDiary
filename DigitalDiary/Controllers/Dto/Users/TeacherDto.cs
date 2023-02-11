using Domain.Entities;

namespace DigitalDiary.Controllers.Dto.Users;

public class TeacherDto : UserDto
{
	
}

public static class TeacherDtoExtensions
{
	public static TeacherDto MapTeacherToDto(this Teacher teacher)
	{
		return new TeacherDto
		{
			Id = teacher.Id,
			FirstName = teacher.FirstName,
			LastName = teacher.LastName,
			SchoolId = teacher.School.Id,
			Email = teacher.Email,
			Role = teacher.Role
		};
	}
}