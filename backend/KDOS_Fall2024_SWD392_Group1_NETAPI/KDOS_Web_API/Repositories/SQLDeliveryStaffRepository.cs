using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
	public class SQLDeliveryStaffRepository : IDeliveryStaffRepository
	{
        private readonly KDOSDbContext deliveryStaffContext;

        public SQLDeliveryStaffRepository(KDOSDbContext deliveryStaffContext)
		{
            this.deliveryStaffContext = deliveryStaffContext;
        }

       public async Task<DeliveryStaff?> AddNewDeliveryStaff(DeliveryStaff staff)
        {
            throw new NotImplementedException();
        }

        public async Task<DeliveryStaff?> DeleteDeliveryStaff(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DeliveryStaff>> GetAllDeliveryStaff()
        {
            throw new NotImplementedException();
        }

        public async Task<DeliveryStaff?> GetDeliveryStaffById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<DeliveryStaff?> UpdateDeliveryStaff(int id, DeliveryStaff staff)
        {
            throw new NotImplementedException();
        }
    }
}

