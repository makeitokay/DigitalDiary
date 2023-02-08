using Domain.Entities;
using Microsoft.AspNetCore.Authorization;

namespace DigitalDiary.AuthorizationAttributes;

public class AuthorizeByRoleAttribute : AuthorizeAttribute
{
	public AuthorizeByRoleAttribute(Role roles)
	{
		Roles = roles.ToString().Replace(" ", string.Empty);
	}
}