using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
	public class SQLDeliveryStaffRepository : IDeliveryStaffRepository
	{
        private readonly KDOSDbContext deliveryStaffContext;

        public SQLDeliveryStaffRepository(KDOSDbContext deliveryStaffContext)
		{
            this.deliveryStaffContext = deliveryStaffContext;
        }

       public async Task<DeliveryStaff?> AddNewDeliveryStaff(DeliveryStaff  deliveryStaff)
        {
            var accountExist = await deliveryStaffContext.Account.FirstOrDefaultAsync(x => x.AccountId == deliveryStaff.AccountId);
            if (accountExist == null || !accountExist.Role.Equals("delivery"))
            {
                return null;
            }
            else
            {
                var deliveryStaffExist = await deliveryStaffContext.DeliveryStaff.FirstOrDefaultAsync(x => x.AccountId == deliveryStaff.AccountId);
                if(deliveryStaffExist != null)
                {
                    return null;
                }
                else
                {
                    await deliveryStaffContext.DeliveryStaff.AddAsync(deliveryStaff);
                    await deliveryStaffContext.SaveChangesAsync();
                    return deliveryStaff;
                }
            }
        }

        public async Task<DeliveryStaff?> DeleteDeliveryStaff(int id)
        {
            var deliveryStaff = await deliveryStaffContext.DeliveryStaff.FirstOrDefaultAsync(x => x.StaffId == id);
            if(deliveryStaff == null)
            {
                return null;
            }
            else
            {
                deliveryStaffContext.DeliveryStaff.Remove(deliveryStaff);
                await deliveryStaffContext.SaveChangesAsync();
                return deliveryStaff;
            }
        }

        public async Task<List<DeliveryStaff>> GetAllDeliveryStaff()
        {
            return await deliveryStaffContext.DeliveryStaff.ToListAsync();
        }

        public async Task<DeliveryStaff?> GetDeliveryStaffById(int id)
        {
            var deliveryStaff = await deliveryStaffContext.DeliveryStaff.FirstOrDefaultAsync(x => x.StaffId == id);
            return deliveryStaff;
        }

        public async Task<DeliveryStaff?> UpdateDeliveryStaff(int id, DeliveryStaff deliveryStaff)
        {
            var deliveryStaffModel = await deliveryStaffContext.DeliveryStaff.FirstOrDefaultAsync(x => x.StaffId == id);
            if (deliveryStaffModel == null)
            {
                return null;
            }
            else
            {
                deliveryStaffModel.StaffName = deliveryStaff.StaffName;
                deliveryStaffModel.Dob = deliveryStaff.Dob;
                deliveryStaffModel.Gender = deliveryStaff.Gender;
                deliveryStaffModel.PhoneNumber = deliveryStaff.PhoneNumber;
                await deliveryStaffContext.SaveChangesAsync();
                return deliveryStaffModel;
            }
        }
    }
}

