using DigitalDiary.Controllers.Dto;

namespace DigitalDiary;

public record DateOnlyRange(DateOnly Start, DateOnly End);

public static class DateOnlyRangeExtensions
{
	public static DateOnlyRangeDto MapToDto(this DateOnlyRange dateOnlyRange, int number)
	{
		return new DateOnlyRangeDto
		{
			Start = dateOnlyRange.Start,
			End = dateOnlyRange.End,
			Number = number
		};
	}
}