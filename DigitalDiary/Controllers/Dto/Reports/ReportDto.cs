namespace DigitalDiary.Controllers.Dto.Reports;

public class ReportDto
{
	public IEnumerable<DateOnlyRangeDto> AvailableQuarters { get; set; }
	
	public Dictionary<string, ReportSubjectDto> Items { get; set; }
}

public class ReportSubjectDto
{
	public Dictionary<int, int> MarksCount { get; set; }
	public double AverageMark { get; set; }
}