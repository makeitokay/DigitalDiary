using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("SchoolAdmins")]
public class SchoolAdmin : User
{
	public SchoolAdmin() : base(Role.SchoolAdmin)
	{
	}

	public override IEnumerable<Group> GetUserGroups()
	{
		yield break;
	}
}