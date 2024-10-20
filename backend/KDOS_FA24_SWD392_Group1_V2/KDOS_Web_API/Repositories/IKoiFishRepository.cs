using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
	public interface IKoiFishRepository
	{
        Task<List<KoiFish>> GetAllKoiFish();
        Task<KoiFish?> GetKoiFishById(int Id);
        Task<KoiFish> AddNewKoiFish(KoiFish koifish);
        Task<KoiFish?> DeleteKoiFish(int Id);
        Task<KoiFish?> UpdateKoiFish(int Id, KoiFish koiFish);
    }
}

