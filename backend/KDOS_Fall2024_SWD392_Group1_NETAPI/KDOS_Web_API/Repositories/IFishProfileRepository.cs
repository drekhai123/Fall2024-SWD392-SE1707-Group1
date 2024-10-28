using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
	public interface IFishProfileRepository
	{
        Task<List<FishProfile>> GetAllProfile();
        Task<FishProfile?> GetProfileById(int id);
        Task<FishProfile?> AddNewFishProfile(FishProfile fishProfile);
        Task<FishProfile?> UpdateFishProfile(int id, FishProfile fishProfile);
        Task<FishProfile?> DeleteProfile(int id);
        Task<List<FishProfile>> GetProfileByCustomerId(int id, string? filterBy = null,string? fishType=null);
        Task<List<FishProfile>> SearchFishProfileByName(string name);
    }
}

