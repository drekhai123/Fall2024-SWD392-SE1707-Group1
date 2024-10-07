using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models;

namespace KDOS_Web_API.Repositories
{
	public class SQLDeliveryStaffRepository : IDeliveryStaffRepository
	{
        private readonly KDOSDbContext deliveryStaffContext;

        public SQLDeliveryStaffRepository(KDOSDbContext deliveryStaffContext)
		{
            this.deliveryStaffContext = deliveryStaffContext;
        }

        Task<Staff> IDeliveryStaffRepository.AddNewDeliveryStaff(Staff staff)
        {
            throw new NotImplementedException();
        }

        Task<Staff> IDeliveryStaffRepository.DeleteDeliveryStaff(int id)
        {
            throw new NotImplementedException();
        }

        Task<List<Staff>> IDeliveryStaffRepository.GetAllDeliveryStaff()
        {
            throw new NotImplementedException();
        }

        Task<Staff> IDeliveryStaffRepository.GetDeliveryStaffById(int id)
        {
            throw new NotImplementedException();
        }

        Task<Staff> IDeliveryStaffRepository.UpdateDeliveryStaff(int id, Staff staff)
        {
            throw new NotImplementedException();
        }
    }
}

