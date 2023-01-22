using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DigitalDiary.AuthorizationAttributes;

public class AuthorizeByPermissionAttribute : AuthorizeAttribute, IAuthorizationFilter
{
	private readonly List<string> _allowedPermissions;
	
	public AuthorizeByPermissionAttribute(PermissionType permissionType)
	{
		_allowedPermissions = permissionType.ToString().Split(", ").ToList();
	}

	public void OnAuthorization(AuthorizationFilterContext context)
	{
		var userHasPermission = context
			.HttpContext
			.User
			.FindAll(claim => claim.Type == Constants.ClaimTypes.Permission)
			.Any(claim => _allowedPermissions.Contains(claim.Value));

		if (!userHasPermission)
		{
			context.Result = new ForbidResult();
		}
	}
}