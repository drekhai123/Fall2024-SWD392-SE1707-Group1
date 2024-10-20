using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
	public class SQLHealthStatusRepository : IHealthStatusRepository
	{
		public SQLHealthStatusRepository()
		{
		}

        public Task<HealthStatus> AddNewHealthStatus(HealthStatus healthStatus)
        {
            throw new NotImplementedException();
        }

        public Task<HealthStatus?> DeleteHealthStatus(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<HealthStatus>> GetAllHealthStatusAsync()
        {
            throw new NotImplementedException();
        }

        public Task<HealthStatus?> GetHealthStatusById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<HealthStatus>> GetStatusOrderDetailId(int id)
        {
            throw new NotImplementedException();
        }

        public Task<HealthStatus?> UpdateHealthStatus(int id, HealthStatus healthStatus)
        {
            throw new NotImplementedException();
        }
    }
}

