using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
	public class SQLStaffRespository : IStaffRepository
	{
        private readonly KDOSDbContext staffContext;

        public SQLStaffRespository(KDOSDbContext staffContext)
		{
            this.staffContext = staffContext;
        }

        Task<Staff> IStaffRepository.AddNewStaff(Staff staff)
        {
            throw new NotImplementedException();
        }

        Task<Staff> IStaffRepository.DeleteStaff(int id)
        {
            throw new NotImplementedException();
        }

        Task<List<Staff>> IStaffRepository.GetAllStaff()
        {
            throw new NotImplementedException();
        }

        Task<Staff> IStaffRepository.GetStaffById(int id)
        {
            throw new NotImplementedException();
        }

        Task<Staff> IStaffRepository.UpdateStaff(int id, Staff staff)
        {
            throw new NotImplementedException();
        }
    }
}

