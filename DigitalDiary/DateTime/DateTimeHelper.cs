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

	public static IEnumerable<DateOnlyRange> GetAvailableWeeks()
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

		var schoolYearEnd = new DateTime(schoolYear.Second, 5, 31);
		while (currentWeekStart + TimeSpan.FromDays(7) <= schoolYearEnd)
		{
			var currentWeekEnd = currentWeekStart + TimeSpan.FromDays(6);
			results.Add((currentWeekStart, currentWeekEnd));
			currentWeekStart = currentWeekEnd + TimeSpan.FromDays(1);
		}
		results.Add((currentWeekStart, currentWeekStart + TimeSpan.FromDays(6)));

		return results
			.Select(range => new DateOnlyRange
			(
				DateOnly.FromDateTime(range.Start),
				DateOnly.FromDateTime(range.End)
			));
	}

	public static int GetCurrentWeekNumber()
	{
		var weeks = GetAvailableWeeks().ToList();
		var now = DateTime.UtcNow;
		var today = DateOnly.FromDateTime(now);
		return Enumerable.Range(1, weeks.Count)
			.First(i => weeks[i - 1].Start <= today && today <= weeks[i - 1].End);
	}

	public static IEnumerable<DateOnlyRange> GetAvailableQuarters()
	{
		var weeks = GetAvailableWeeks()
			.ToList();
		var firstSemester = weeks
			.TakeWhile(week => week.Start.Month >= 8)
			.ToList();
		var secondSemester = weeks
			.Skip(firstSemester.Count)
			.ToList();

		var quarters1 = GetQuartersForSemester(firstSemester)
			.ToList();
		var quarters2 = GetQuartersForSemester(secondSemester)
			.ToList();

		return quarters1.Concat(quarters2);
	}

	public static int GetCurrentQuarterNumber()
	{
		var quarters = GetAvailableQuarters().ToList();
		var now = DateTime.UtcNow;
		var today = DateOnly.FromDateTime(now);
		return Enumerable.Range(1, quarters.Count)
			.First(i => quarters[i - 1].Start <= today && today <= quarters[i - 1].End);
	}

	private static IEnumerable<DateOnlyRange> GetQuartersForSemester(List<DateOnlyRange> semester)
	{
		var count = semester.Count;
		yield return new DateOnlyRange(semester.First().Start, semester.Take(count / 2).Last().End);
		yield return new DateOnlyRange(semester.Skip(count / 2).First().Start, semester.Last().End);
	}
}