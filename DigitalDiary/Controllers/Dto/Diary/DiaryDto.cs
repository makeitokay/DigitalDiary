﻿using DigitalDiary.Controllers.Dto.Journal;

namespace DigitalDiary.Controllers.Dto.Diary;

public class DiaryDto
{
	public IEnumerable<object> AvailableWeeks { get; set; }
	public Dictionary<DayOfWeek, List<DiaryLessonItemDto>> Items { get; set; }
}

public class DiaryLessonItemDto
{
	public int Order { get; set; }
	public string Subject { get; set; }
	public MarkDto Mark { get; set; }
	public string Homework { get; set; }
}