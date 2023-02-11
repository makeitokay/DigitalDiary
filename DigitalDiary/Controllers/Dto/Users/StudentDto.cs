using Domain.Entities;

namespace DigitalDiary.Controllers.Dto.Users;

public class StudentDto : UserDto
{
	
}

public static class StudentDtoExtensions
{
	public static StudentDto MapStudentToDto(this Student student)
	{
		return new StudentDto
		{
			Id = student.Id,
			FirstName = student.FirstName,
			LastName = student.LastName,
			SchoolId = student.School.Id,
			Email = student.Email,
			Role = student.Role
		};
	}
}