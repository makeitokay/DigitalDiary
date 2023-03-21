using DigitalDiary.Controllers.Dto.Groups;
using Domain.Entities;

namespace DigitalDiary.Controllers.Dto.Users;

public class StudentDto : UserDto
{
	public IEnumerable<int> Parents { get; set; } = default!;
	public GroupDto Group { get; set; }
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
			Email = student.Email,
			Role = student.Role.ToString(),
			Parents = student.Parents.Select(p => p.Id),
			Group = new GroupDto
			{
				Id = student.Group.Id,
				Number = student.Group.Number,
				Letter = student.Group.Letter
			}
		};
	}
}