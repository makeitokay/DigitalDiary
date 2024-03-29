﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DigitalDiary.Controllers.Dto.Authorization;
using Domain.Entities;
using Infrastructure;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace DigitalDiary.Controllers;

[Route("auth")]
public class AuthorizationController : ControllerBase
{
	private readonly IUserRepository _userRepository;
	private readonly IPasswordManager _passwordManager;

	public AuthorizationController(IUserRepository userRepository, IPasswordManager passwordManager)
	{
		_userRepository = userRepository;
		_passwordManager = passwordManager;
	}

	[HttpPost("login")]
	public async Task<ActionResult<LoginResponseDto>> LoginAsync([FromBody] LoginDto loginDto)
	{
		Enum.TryParse<Role>(loginDto.Role, out var role);
		var user = await _userRepository.TryGetByEmailAndRoleAsync(loginDto.Email, role);

		if (user == null || !_passwordManager.VerifyPassword(loginDto.Password, user.PasswordHash, user.PasswordSalt))
		{
			return Unauthorized("Неверный логин или пароль");
		}

		var userClaims = new List<Claim>
			{
				new(ClaimTypes.Email, user.Email),
				new(ClaimTypes.Role, user.Role.ToString()),
				new(Constants.DigitalDiaryClaimTypes.SchoolId, user.School.Id.ToString()),
				new(Constants.DigitalDiaryClaimTypes.UserId, user.Id.ToString())
			};

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