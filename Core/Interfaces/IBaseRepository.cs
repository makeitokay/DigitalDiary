using Core.Entities;

namespace Core.Interfaces;

public interface IBaseRepository<TEntity> where TEntity : BaseEntity
{
	Task<TEntity> CreateAsync(TEntity entity);
	Task<TEntity> UpdateAsync(TEntity entity);
	Task DeleteAsync(TEntity entity);
	Task<TEntity> GetAsync(int id);
}