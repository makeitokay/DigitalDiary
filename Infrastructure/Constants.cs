namespace Infrastructure;

public static class Constants
{
	public static class Authentication
	{
		public const string Issuer = "DigitalDiary";
		public const string Audience = "DigitalDiary.client";
	}

	public static class ClaimTypes
	{
		public const string Permission = "Permission";
	}
}