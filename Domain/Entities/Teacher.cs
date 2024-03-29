﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Teachers")]
public class Teacher : User
{
	public Teacher() : base(Role.Teacher)
	{
	}
	
	public virtual IEnumerable<Schedule> Schedule { get; set; }
	
	public override IEnumerable<Group> GetUserGroups()
	{
		return Schedule.Select(s => s.Group).Distinct();
	}
}