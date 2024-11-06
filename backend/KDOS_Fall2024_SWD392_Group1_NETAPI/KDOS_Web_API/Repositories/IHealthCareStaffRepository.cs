using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
	public interface IHealthCareStaffRepository
	{
        Task<List<HealthCareStaff>> GetAllStaff();
        Task<HealthCareStaff?> GetStaffById(int id);
        Task<HealthCareStaff?> AddNewStaff(HealthCareStaff HealthCareStaff);
        Task<HealthCareStaff?> UpdateStaff(int id, HealthCareStaff HealthCareStaff);
        Task<HealthCareStaff?> UpdateStaffStatus(int id, HealthCareStaff HealthCareStaff);
        Task<HealthCareStaff?> DeleteStaff(int id);
        Task<List<HealthCareStaff>> GetStaffByName(string name);
        Task<HealthCareStaff?> GetStaffByAccountId(int id);
    }
}

