using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Core.Entities;

public class BaseUser : BaseEntity
{
	[Column("FirstName")]
	public string FirstName { get; set; } = default!;
	
	[Column("LastName")]
	public string LastName { get; set; } = default!;

	[Column("Email")]
	public string Email { get; set; } = default!;

	[Column("PasswordHash")]
	public string PasswordHash { get; set; } = default!;

	[Column("PasswordSalt")]
	public byte[] PasswordSalt { get; set; } = default!;
}