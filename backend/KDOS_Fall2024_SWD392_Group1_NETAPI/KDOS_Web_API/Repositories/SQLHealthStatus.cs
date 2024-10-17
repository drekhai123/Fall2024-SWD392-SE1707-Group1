using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public class SQLHealthStatus : IHealthStatus
    {
        public Task<HealthStatus> AddNewHealthStatus(HealthStatus healthStatus)
        {
            throw new NotImplementedException();
        }

        public Task<HealthStatus?> DeleteHealthStatus(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<HealthStatus>> GetAllHealthStatus()
        {
            throw new NotImplementedException();
        }

        public Task<HealthStatus?> GetHealthStatusById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<HealthStatus>?> GetHealthStatusByOrderDetailsId(int id)
        {
            throw new NotImplementedException();
        }

        public Task<HealthStatus?> UpdateFishStatus(int id, bool status)
        {
            throw new NotImplementedException();
        }

        public Task<HealthStatus?> UpdateHealthStatus(int id, HealthStatus healthStatus)
        {
            throw new NotImplementedException();
        }
    }
}

