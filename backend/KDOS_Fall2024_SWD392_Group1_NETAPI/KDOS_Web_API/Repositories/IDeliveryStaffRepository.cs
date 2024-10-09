using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    // The interface is for all the action to work with in a API
    public interface IDeliveryStaffRepository
	{
        Task<List<DeliveryStaff>> GetAllDeliveryStaff();
        Task<DeliveryStaff> GetDeliveryStaffById(int id);
        Task<DeliveryStaff> AddNewDeliveryStaff(Staff staff);
        Task<DeliveryStaff> UpdateDeliveryStaff(int id, Staff staff);
        Task<DeliveryStaff> DeleteDeliveryStaff(int id);
    }
}

