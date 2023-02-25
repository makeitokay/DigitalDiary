using Domain.Entities;

namespace DigitalDiary.Controllers.Dto.Users;

public class ParentDto : UserDto
{
	public IEnumerable<int> Children { get; set; } = default!;
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
			Email = parent.Email,
			Role = parent.Role.ToString(),
			Children = parent.Children.Select(c => c.Id)
		};
	}
}