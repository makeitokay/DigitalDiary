using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Interfaces;
using DigitalDiary.Controllers.Authorization.Dto;
using Infrastructure;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace DigitalDiary.Controllers.Authorization;

[Route("auth")]
public class AuthorizationController : ControllerBase
{
	private readonly IUserRepository _userRepository;

	public AuthorizationController(IUserRepository userRepository)
	{
		_userRepository = userRepository;
	}

	[HttpPost("login")]
	public async Task<ActionResult<LoginResponseDto>> LoginAsync([FromBody] LoginDto loginDto)
	{
		var user = await _userRepository.TryGetByEmailAsync(loginDto.Email);

		if (user == null || !AuthorizationHelper.VerifyPassword(loginDto.Password, user.PasswordHash, user.PasswordSalt))
		{
			return Unauthorized();
		}

		var userClaims = new List<Claim> { new(ClaimTypes.Email, user.Email) };
		userClaims.AddRange(user
			.GetAllPermissions()
			.Select(permission => new Claim(Constants.ClaimTypes.Permission, permission.Type.ToString())));
		userClaims.AddRange(user
			.Roles
			.Select(role => new Claim(ClaimTypes.Role, role.Type.ToString())));

		var jwt = new JwtSecurityToken(
			issuer: Constants.Authentication.Issuer,
			audience: Constants.Authentication.Audience,
			claims: userClaims,
			expires: DateTime.UtcNow.Add(TimeSpan.FromDays(1)),
			signingCredentials: new SigningCredentials(
				new SymmetricSecurityKey(Encoding.UTF8.GetBytes("DigitalDiarySecretKey2023")),
				SecurityAlgorithms.HmacSha256));

		return new LoginResponseDto { AccessToken = new JwtSecurityTokenHandler().WriteToken(jwt) };
	}
}