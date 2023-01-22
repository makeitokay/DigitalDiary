using Core.Entities;
using Microsoft.AspNetCore.Authorization;

namespace DigitalDiary.AuthorizationAttributes;

public class AuthorizeByRoleAttribute : AuthorizeAttribute
{
	public AuthorizeByRoleAttribute(RoleType roles)
	{
		Roles = roles.ToString().Replace(" ", string.Empty);
	}
}