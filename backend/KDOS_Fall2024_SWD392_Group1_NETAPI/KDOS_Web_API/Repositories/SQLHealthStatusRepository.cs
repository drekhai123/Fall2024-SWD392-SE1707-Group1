using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
	public class SQLHealthStatusRepository : IHealthStatusRepository
	{
        private readonly KDOSDbContext healthStatusContext;

        public SQLHealthStatusRepository(KDOSDbContext healthStatusContext)
		{
            this.healthStatusContext = healthStatusContext;
        }

        public async Task<HealthStatus?> AddNewHealthStatus(HealthStatus healthStatus)
        {
                // add extra step to check customer status
                var orderExist = await healthStatusContext.OrderDetails.FirstOrDefaultAsync(x => x.OrderDetailsId == healthStatus.OrderDetailsId);
            var healthStatusExist = await healthStatusContext.HealthStatus.FirstOrDefaultAsync(x => x.Date.Equals(healthStatus.Date));
                if (orderExist == null && healthStatusExist!=null)
                {
                    // If there is no order with this detail or the health check is already exist, do not create new one
                    return null;
                }
                else
                {
                        await healthStatusContext.HealthStatus.AddAsync(healthStatus);
                        await healthStatusContext.SaveChangesAsync();
                        return healthStatus;
                }
        }

        public async Task<HealthStatus?> DeleteHealthStatus(int id)
        {
            var healthModel = await healthStatusContext.HealthStatus.FirstOrDefaultAsync(x => x.HealthStatusId == id);
            if(healthModel == null)
            {
                return null;
            }
            else
            {
                healthStatusContext.HealthStatus.Remove(healthModel);
                await healthStatusContext.SaveChangesAsync();
                return healthModel;
            }
        }

        public async Task<List<HealthStatus>> GetAllHealthStatusAsync()
        {
            return await healthStatusContext.HealthStatus.ToListAsync();
        }

        public async Task<HealthStatus?> GetHealthStatusById(int id)
        {
            var healthModel = await healthStatusContext.HealthStatus.FirstOrDefaultAsync(x => x.HealthStatusId == id);
            if (healthModel == null)
            {
                return null;
            }
            else
            {
                return healthModel;
            }
        }

        public async Task<List<HealthStatus>> GetStatusOrderDetailId(int id)
        {
            var healthStatuslList = await healthStatusContext.HealthStatus.Where(x => x.OrderDetailsId == id).ToListAsync();
                return healthStatuslList;
        }

        public async Task<HealthStatus?> UpdateHealthStatus(int id, HealthStatus healthStatus)
        {
            var healthModel = await healthStatusContext.HealthStatus.FirstOrDefaultAsync(x => x.HealthStatusId == id);
            if (healthModel == null)
            {
                return null;
            }
            else
            {
                healthModel.OxygenLevel = healthStatus.OxygenLevel;
                healthModel.PHLevel = healthStatus.PHLevel;
                healthModel.Status = healthStatus.Status;
                healthModel.Temperature = healthStatus.Temperature;
                healthModel.Notes = healthStatus.Notes;
                await healthStatusContext.SaveChangesAsync();
                return healthModel;
            }
        }
    }
}

