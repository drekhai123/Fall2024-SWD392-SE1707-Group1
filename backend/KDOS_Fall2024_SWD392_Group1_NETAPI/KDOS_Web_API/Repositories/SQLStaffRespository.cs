using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
	public class SQLStaffRespository : IStaffRepository
	{
        private readonly KDOSDbContext staffContext;

        public SQLStaffRespository(KDOSDbContext staffContext)
		{
            this.staffContext = staffContext;
        }

        public async Task<Staff?> AddNewStaff(Staff staff)
        {
            // add extra step to check customer status
            var accountExist = await staffContext.Account.FirstOrDefaultAsync(x => x.AccountId == staff.AccountId);
            if (accountExist == null || !accountExist.Role.Equals("staff"))
            {
                return null;
            }
            else
            {
                var customerExist = await staffContext.Staff.FirstOrDefaultAsync(x => x.AccountId == staff.AccountId);
                if (customerExist != null)
                {
                    return null;
                }
                else
                {
                    await staffContext.Staff.AddAsync(staff);
                    await staffContext.SaveChangesAsync();
                    return staff;
                }
            }
        }

        public async Task<Staff?> DeleteStaff(int id)
        {
            var staffModel = await staffContext.Staff.FirstOrDefaultAsync(x => x.StaffId == id);
            if (staffModel == null)
            {
                return null;
            }
            staffContext.Staff.Remove(staffModel);
            await staffContext.SaveChangesAsync();
            return staffModel;
        }
        public async Task<List<Staff>> GetAllStaff()
        {
            var staffList = await staffContext.Staff.ToListAsync();
            return staffList;
        }

        public async Task<Staff?> GetStaffById(int id)
        {
            var staffModel = await staffContext.Staff.FirstOrDefaultAsync(x => x.StaffId == id);
            if (staffModel == null)
            {
                return null;
            }
            return staffModel;
        }

        public async Task<Staff?> UpdateStaff(int id, Staff staff)
        {
            var staffModel = await staffContext.Staff.FirstOrDefaultAsync(x => x.StaffId == id);
            if (staffModel == null)
            {
                return null;
            }
            else
            {
                staffModel.StaffName = staff.StaffName;
                staffModel.Age = staff.Age;
                staffModel.Gender = staff.Gender;
                staffModel.PhoneNumber = staff.PhoneNumber;
                await staffContext.SaveChangesAsync();
                return staffModel;
            }
           
        }

        public async Task<List<Staff>> GetStaffByName(string name)
        {
            var staffModelList = await staffContext.Staff.Where(x => x.StaffName.Contains(name)).ToListAsync();
            return staffModelList;
        }
    }
}

