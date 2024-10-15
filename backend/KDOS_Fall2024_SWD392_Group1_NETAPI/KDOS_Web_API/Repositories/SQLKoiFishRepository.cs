using System;
using System.Security.Principal;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
	public class SQLKoiFishRepository : IKoiFishRepository
	{
        private readonly KDOSDbContext koiFishContext;

        public SQLKoiFishRepository(KDOSDbContext koiFishContext)
        {
            this.koiFishContext = koiFishContext;
        }

        public async Task<KoiFish> AddNewKoiFish(KoiFish koifish)
        {
            await koiFishContext.KoiFish.AddAsync(koifish);
            await koiFishContext.SaveChangesAsync();
            return koifish;
        }

        public async Task<KoiFish?> DeleteKoiFish(int Id)
        {
            var koiFish = await koiFishContext.KoiFish.FirstOrDefaultAsync(x=>x.KoiFishId == Id);
            if(koiFish == null)
            {
                return null;
            }
            koiFishContext.KoiFish.Remove(koiFish);
            await koiFishContext.SaveChangesAsync();
            return koiFish;
        }

        public async Task<List<KoiFish>> GetAllKoiFish()
        {
            var koiFish = await koiFishContext.KoiFish.ToListAsync();

            return koiFish;
        }

        public async Task<KoiFish?> GetKoiFishById(int Id)
        {
            var koiFish = await koiFishContext.KoiFish.FirstOrDefaultAsync(x => x.KoiFishId == Id);
            if (koiFish == null)
            {
                return null;
            }
            return koiFish;
        }

        public async Task<KoiFish?> UpdateKoiFish(int Id, KoiFish koiFish)
        {
            var koiFishModel = await koiFishContext.KoiFish.FirstOrDefaultAsync(x => x.KoiFishId == Id);
            if (koiFishModel == null)
            {
                return null;
            }
            else
            {
                koiFishModel.FishType = koiFish.FishType;
                koiFishModel.Description = koiFish.FishType;
                await koiFishContext.SaveChangesAsync();
                return koiFishModel;
            }
        }
    }
}

