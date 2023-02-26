namespace DigitalDiary;

public static class DateTimeHelper
{
	public static IEnumerable<int> GetDaysInMonthForDayOfWeek(DayOfWeek dayOfWeek, int month)
	{
		var year = GetYearForMonth(month);
		return Enumerable.Range(1, DateTime.DaysInMonth(year, month))
			.Where(d => new DateTime(year, month, d).DayOfWeek == dayOfWeek);
	}

	public static bool IsCurrentSchoolYear(DateOnly date)
	{
		var currentSchoolYear = GetCurrentSchoolYear();
		return date.Year == currentSchoolYear.First || date.Year == currentSchoolYear.Second;
	}

	private static (int First, int Second) GetCurrentSchoolYear()
	{
		var now = DateTime.UtcNow;
		var currentYear = now.Year;
		return now.Month < 9 ? (currentYear - 1, currentYear) : (currentYear, currentYear + 1);
	}

	public static int GetYearForMonth(int month)
	{
		var currentSchoolYear = GetCurrentSchoolYear();
		return month >= 9 ? currentSchoolYear.First : currentSchoolYear.Second;
	}
}