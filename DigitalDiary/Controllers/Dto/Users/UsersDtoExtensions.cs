using Domain.Entities;

namespace DigitalDiary.Controllers.Dto.Users;

public static class UsersDtoExtensions
{
	public static IEnumerable<UserDto> MapUsersToDto(this IEnumerable<User> users)
	{
		var result = new List<UserDto>();
		foreach (var user in users)
		{
			var dto = user switch
			{
				Parent parent => parent.MapParentToDto(),
				Teacher teacher => teacher.MapTeacherToDto(),
				Student student => student.MapStudentToDto(),
				_ => user.MapUserToDto()
			};
			
			result.Add(dto);
		}

		return result;
	}
	
}