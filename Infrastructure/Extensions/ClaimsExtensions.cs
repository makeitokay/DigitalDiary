using System.Security.Claims;
using Domain.Entities;

namespace Infrastructure.Extensions;

public static class ClaimsExtensions
{
	public static int GetSchoolId(this IEnumerable<Claim> claims)
	{
		return int.Parse(claims.GetClaimValue(Constants.DigitalDiaryClaimTypes.SchoolId));
	}

	public static string GetEmail(this IEnumerable<Claim> claims)
	{
		return claims.GetClaimValue(ClaimTypes.Email);
	}

	public static Role GetRole(this IEnumerable<Claim> claims)
	{
		var success = Enum.TryParse<Role>(claims.GetClaimValue(ClaimTypes.Role), out var role);
		if (!success)
		{
			throw new ArgumentException();
		}
		return role;
	}

	private static string GetClaimValue(this IEnumerable<Claim> claims, string claimType)
	{
		return claims.FirstOrDefault(claim => claim.Type == claimType)?.Value
		       ?? throw new ArgumentException();
	}
}