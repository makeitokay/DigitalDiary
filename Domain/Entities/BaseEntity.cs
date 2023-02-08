using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public abstract class BaseEntity
{
	[Column("Id")]
	public int Id { get; set; }
}