using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface IHealthStatusRepository
    {
        Task<List<HealthStatus>> GetAllHealthStatusAsync();
        Task<HealthStatus?> GetHealthStatusById(int id);
        Task<HealthStatus> AddNewHealthStatus(HealthStatus healthStatus);
        Task<HealthStatus?> DeleteHealthStatus(int id);
        Task<HealthStatus?> UpdateHealthStatus(int id, HealthStatus healthStatus);
        Task<List<HealthStatus>> GetStatusOrderDetailId(int id);
    }
}
