namespace DigitalDiary.Admin.Controllers;

public class CreateSchoolCreateRequestDto
{
	public string SchoolName { get; set; } = default!;
	
	public string SchoolCity { get; set; } = default!;

	public string CreatorEmail { get; set; } = default!;

	public string CreatorFirstName { get; set; } = default!;

	public string CreatorLastName { get; set; } = default!;
}