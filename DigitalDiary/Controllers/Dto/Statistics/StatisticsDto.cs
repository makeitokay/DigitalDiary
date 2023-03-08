namespace DigitalDiary.Controllers.Dto.Statistics;

public class StatisticsDto
{
	public DateOnly MinimumStartDate { get; set; }
	public DateOnly MaximumEndDate { get; set; }
	public Dictionary<DateOnly, double> Statistics { get; set; }
}