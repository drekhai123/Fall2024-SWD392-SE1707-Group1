using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    // The interface is for all the action to work with in a API
    public interface IDeliveryStaffRepository
	{
        Task<List<Staff>> GetAllDeliveryStaff();
        Task<Staff> GetDeliveryStaffById(int id);
        Task<Staff> AddNewDeliveryStaff(Staff staff);
        Task<Staff> UpdateDeliveryStaff(int id, Staff staff);
        Task<Staff> DeleteDeliveryStaff(int id);
    }
}

