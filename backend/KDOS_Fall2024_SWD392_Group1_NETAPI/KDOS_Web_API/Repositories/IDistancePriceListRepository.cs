using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface IDistancePriceListRepository
    {
        Task<List<DistancePriceList>> GetDistancePriceList();
        Task<DistancePriceList?> GetDistancePriceListById(int distancePriceListId);
        Task<DistancePriceList?> UpdateDistancetPriceList(int distancePriceListId, DistancePriceList distancePriceList);
        Task<DistancePriceList?> DeleteDistancePriceListById(int distancePriceListId);
        Task<DistancePriceList?> AddNewDistancePriceList(DistancePriceList distancePriceList);
    }
}
