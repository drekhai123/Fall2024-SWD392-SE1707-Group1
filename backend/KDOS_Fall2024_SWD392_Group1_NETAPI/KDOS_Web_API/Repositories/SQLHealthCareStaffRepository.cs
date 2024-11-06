using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
	public class SQLHealthCareStaffRepository : IHealthCareStaffRepository
	{
        private readonly KDOSDbContext healthcareStaffContext;

        public SQLHealthCareStaffRepository(KDOSDbContext healthcareStaffContext)
		{
            this.healthcareStaffContext = healthcareStaffContext;
        }

       public async Task<HealthCareStaff?> AddNewStaff(HealthCareStaff HealthCareStaff)
        {
            // add extra step to check customer status
            var accountExist = await healthcareStaffContext.Account.FirstOrDefaultAsync(x => x.AccountId == HealthCareStaff.AccountId);
            if (accountExist == null || !accountExist.Role.Equals("healthcare"))
            {
                return null;
            }
            else
            {
                var staffExist = await healthcareStaffContext.HealthCareStaff.FirstOrDefaultAsync(x => x.AccountId == HealthCareStaff.AccountId);
                if (staffExist != null)
                {
                    return null;
                }
                else
                {
                    await healthcareStaffContext.HealthCareStaff.AddAsync(HealthCareStaff);
                    await healthcareStaffContext.SaveChangesAsync();
                    return HealthCareStaff;
                }
            }
        }

        public async Task<HealthCareStaff?> DeleteStaff(int id)
        {
            var staffModel = await healthcareStaffContext.HealthCareStaff.FirstOrDefaultAsync(x => x.StaffId == id);
            if (staffModel == null)
            {
                return null;
            }
            healthcareStaffContext.HealthCareStaff.Remove(staffModel);
            await healthcareStaffContext.SaveChangesAsync();
            return staffModel;
        }

        public async Task<List<HealthCareStaff>> GetAllStaff()
        {
            var staffList = await healthcareStaffContext.HealthCareStaff.ToListAsync();
            return staffList;
        }

        public async Task<HealthCareStaff?> GetStaffByAccountId(int id)
        {
            var staffModel = await healthcareStaffContext.HealthCareStaff.FirstOrDefaultAsync(x => x.AccountId == id);
            if (staffModel == null)
            {
                return null;
            }
            return staffModel;
        }

        public async Task<HealthCareStaff?> GetStaffById(int id)
        {
            var staffModel = await healthcareStaffContext.HealthCareStaff.FirstOrDefaultAsync(x => x.StaffId == id);
            if (staffModel == null)
            {
                return null;
            }
            return staffModel;
        }

        public async Task<List<HealthCareStaff>> GetStaffByName(string name)
        {
            var staffModelList = await healthcareStaffContext.HealthCareStaff.Where(x => x.StaffName.Contains(name)).ToListAsync();
            return staffModelList;
        }

        public async Task<HealthCareStaff?> UpdateStaff(int id, HealthCareStaff HealthCareStaff)
        {
            var staffModel = await healthcareStaffContext.HealthCareStaff.FirstOrDefaultAsync(x => x.StaffId == id);
            if (staffModel == null)
            {
                return null;
            }
            else
            {
                staffModel.StaffName = HealthCareStaff.StaffName;
                staffModel.Dob = HealthCareStaff.Dob;
                staffModel.Gender = HealthCareStaff.Gender;
                staffModel.PhoneNumber = HealthCareStaff.PhoneNumber;
                await healthcareStaffContext.SaveChangesAsync();
                return staffModel;
            }
        }

        public async Task<HealthCareStaff?> UpdateStaffStatus(int id, HealthCareStaff HealthCareStaff)
        {
            var staffModel = await healthcareStaffContext.HealthCareStaff.FirstOrDefaultAsync(x => x.StaffId == id);
            if (staffModel == null)
            {
                return null;
            }
            else
            {
                staffModel.StaffStatus = HealthCareStaff.StaffStatus;
                await healthcareStaffContext.SaveChangesAsync();
                return staffModel;
            }
        }
    }
}

