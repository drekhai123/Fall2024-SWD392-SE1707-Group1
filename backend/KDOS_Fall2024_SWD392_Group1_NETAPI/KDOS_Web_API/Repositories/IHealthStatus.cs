using System;
using KDOS_Web_API.Models.Domains;
namespace KDOS_Web_API.Repositories
{
    public interface IHealthStatus
    {
        Task<List<HealthStatus>> GetAllHealthStatus();
        Task<HealthStatus?> GetHealthStatusById(int id);
        Task<List<HealthStatus>?> GetHealthStatusByOrderDetailsId(int id);
        Task<HealthStatus> AddNewHealthStatus(HealthStatus healthStatus);
        Task<HealthStatus?> DeleteHealthStatus(int id);
        Task<HealthStatus?> UpdateHealthStatus(int id, HealthStatus healthStatus);
        Task<HealthStatus?> UpdateFishStatus(int id, bool status);
    }
  
}

