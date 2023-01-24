using Core.Entities;

namespace Core.Interfaces;

public interface IBaseUserRepository<TUser> : IBaseRepository<TUser> where TUser : BaseUser
{
	Task<TUser?> TryGetByEmailAsync(string email);
}