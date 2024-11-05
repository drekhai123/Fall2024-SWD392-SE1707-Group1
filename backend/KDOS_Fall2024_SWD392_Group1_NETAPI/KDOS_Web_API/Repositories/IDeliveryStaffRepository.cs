using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    // The interface is for all the action to work with in a API/Controller
    public interface IDeliveryStaffRepository
	{
        Task<List<DeliveryStaff>> GetAllDeliveryStaff();
        Task<DeliveryStaff?> GetDeliveryStaffById(int id);
        Task<DeliveryStaff?> AddNewDeliveryStaff(DeliveryStaff staff);
        Task<DeliveryStaff?> UpdateDeliveryStaff(int id, DeliveryStaff staff);
        Task<DeliveryStaff?> UpdateDeliveryStaffStatus(int id, DeliveryStaff staff);
        Task<DeliveryStaff?> DeleteDeliveryStaff(int id);
        Task<DeliveryStaff?> GetDeliveryStaffByAccountId(int id);
    }
}

