using System;
using KDOS_Web_API.Models;
namespace KDOS_Web_API.Repositories
{
    // The interface is for all the action to work with in a API
    public interface IStaffRepository
	{
        Task<List<Staff>> GetAllStaff();
        Task<Staff> GetStaffById(int id);
        Task<Staff> AddNewStaff(Staff staff);
        Task<Staff> UpdateStaff(int id, Staff staff);
        Task<Staff> DeleteStaff(int id);
    }
}

