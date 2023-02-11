using System.Security.Claims;

namespace Infrastructure.Extensions;

public static class ClaimsExtensions
{
	public static int GetSchoolId(this IEnumerable<Claim> claims)
	{
		return int.Parse(claims.FirstOrDefault(claim => claim.Type == Constants.DigitalDiaryClaimTypes.SchoolId)?.Value ??
		       throw new ArgumentException());
	}
}