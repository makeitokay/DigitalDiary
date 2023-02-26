namespace Infrastructure;

public static class Constants
{
	public static class Authentication
	{
		public const string Issuer = "DigitalDiary";
		public const string Audience = "DigitalDiary.client";
	}

	public static class DigitalDiaryClaimTypes
	{
		public const string UserId = "UserID";
		public const string SchoolId = "School";
	}
}