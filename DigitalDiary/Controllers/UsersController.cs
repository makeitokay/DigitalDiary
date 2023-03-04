using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto.Users;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("users")]
[AuthorizeByRole(Role.SchoolAdmin)]
public class UsersController : ControllerBase
{
	private readonly IUserRepository _userRepository;
	private readonly IEmailClient _emailClient;
	private readonly IPasswordManager _passwordManager;

	public UsersController(
		IUserRepository userRepository,
		IEmailClient emailClient,
		IPasswordManager passwordManager)
	{
		_userRepository = userRepository;
		_emailClient = emailClient;
		_passwordManager = passwordManager;
	}

	[HttpGet("teachers")]
	public async Task<IActionResult> GetTeachersAsync()
	{
		var schoolId = User.Claims.GetSchoolId();
		var users = (await _userRepository.GetUsersInSchoolByRoleAsync(schoolId, Role.Teacher))
			.OfType<Teacher>()
			.Select(t => t.MapTeacherToDto());

		return Ok(users);
	}

	[HttpPost("teachers")]
	public async Task<IActionResult> AddTeacherAsync([FromBody] TeacherDto teacherDto)
	{
		var teacher = await CreateUserAsync<Teacher>(teacherDto);
		await _userRepository.CreateAsync(teacher);
		return Ok();
	}
	
	[HttpGet("students")]
	public async Task<IActionResult> GetStudentsAsync()
	{
		var schoolId = User.Claims.GetSchoolId();
		var users = (await _userRepository.GetUsersInSchoolByRoleAsync(schoolId, Role.Student))
			.OfType<Student>()
			.Select(s => s.MapStudentToDto());

		return Ok(users);
	}
	
	[HttpPost("students")]
	public async Task<IActionResult> AddStudentAsync([FromBody] StudentDto studentDto)
	{
		var student = await CreateUserAsync<Student>(studentDto);
		student.GroupId = studentDto.GroupId;
		await _userRepository.CreateAsync(student);
		return Ok();
	}
	
	[HttpGet("parents")]
	public async Task<IActionResult> GetParentsAsync()
	{
		var schoolId = User.Claims.GetSchoolId();
		var users = (await _userRepository.GetUsersInSchoolByRoleAsync(schoolId, Role.Parent))
			.OfType<Parent>()
			.Select(p => p.MapParentToDto());

		return Ok(users);
	}
	
	[HttpPost("parents")]
	public async Task<IActionResult> AddParentAsync([FromBody] ParentDto parentDto)
	{
		var parent = await CreateUserAsync<Parent>(parentDto);
		var children = await _userRepository
			.Items
			.Where(u => parentDto.Children.Contains(u.Id))
			.OfType<Student>()
			.ToListAsync();

		parent.Children = children;
			
		await _userRepository.CreateAsync(parent);
		return Ok();
	}
	
	[HttpGet("admins")]
	public async Task<IActionResult> GetSchoolAdminsAsync()
	{
		var schoolId = User.Claims.GetSchoolId();
		var users = (await _userRepository.GetUsersInSchoolByRoleAsync(schoolId, Role.SchoolAdmin))
			.OfType<SchoolAdmin>()
			.Select(a => a.MapUserToDto());

		return Ok(users);
	}
	
	[HttpPost("admins")]
	public async Task<IActionResult> AddSchoolAdminAsync([FromBody] UserDto userDto)
	{
		var admin = await CreateUserAsync<SchoolAdmin>(userDto);
		await _userRepository.CreateAsync(admin);
		return Ok();
	}

	private async Task<TUser> CreateUserAsync<TUser>(UserDto userDto) where TUser : User, new()
	{
		var password = _passwordManager.GenerateRandomPassword();
		var passwordHash = _passwordManager.GetPasswordHash(password, out var salt);

		var schoolId = User.Claims.GetSchoolId();
		var user = new TUser
		{
			FirstName = userDto.FirstName,
			LastName = userDto.LastName,
			Email = userDto.Email,
			SchoolId = schoolId,
			PasswordHash = passwordHash,
			PasswordSalt = salt
		};
		
		await _emailClient.SendUserCreationEmailAsync(user, password);

		return user;
	}
}