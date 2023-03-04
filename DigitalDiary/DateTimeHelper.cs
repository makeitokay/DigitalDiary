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

	public static IEnumerable<(DateOnly Start, DateOnly End)> GetAvailableWeeks()
	{
		var schoolYear = GetCurrentSchoolYear();

		var currentWeekStart =
			Enumerable
				.Range(1, DateTime.DaysInMonth(schoolYear.First, 9))
				.Select(day => new DateTime(schoolYear.First, 9, day))
				.SkipWhile(date => date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
				.First()
				.Date;
		if (currentWeekStart.DayOfWeek != DayOfWeek.Monday)
		{
			currentWeekStart -= TimeSpan.FromDays(currentWeekStart.DayOfWeek - DayOfWeek.Monday);
		}

		var results = new List<(DateTime Start, DateTime End)>();

		var schoolYearEnd = GetSchoolYearEnd();
		while (currentWeekStart + TimeSpan.FromDays(7) <= schoolYearEnd)
		{
			var currentWeekEnd = currentWeekStart + TimeSpan.FromDays(6);
			results.Add((currentWeekStart, currentWeekEnd));
			currentWeekStart = currentWeekEnd + TimeSpan.FromDays(1);
		}
		results.Add((currentWeekStart, currentWeekStart + TimeSpan.FromDays(6)));

		return results
			.Select(range =>
			(
				new DateOnly(range.Start.Year, range.Start.Month, range.Start.Day),
				new DateOnly(range.End.Year, range.End.Month, range.End.Day)
			));
	}

	private static DateTime GetSchoolYearEnd() => new(GetCurrentSchoolYear().Second, 5, 31);

	public static int GetCurrentWeekNumber()
	{
		var weeks = GetAvailableWeeks().ToList();
		var now = DateTime.UtcNow;
		var today = new DateOnly(now.Year, now.Month, now.Day);
		return Enumerable.Range(1, weeks.Count)
			.First(i => weeks[i].Start <= today && today <= weeks[i].End);
	}
}