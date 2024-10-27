using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface IWeightPriceListRepository
    {
        Task<List<WeightPriceList>> GetWeightPriceLists();
        Task<WeightPriceList?> GetWeightPriceListById(int weightPriceListId);
        Task<WeightPriceList?> UpdateWeightPriceList(int weightPriceListId, WeightPriceList weightPriceList);
        Task<WeightPriceList?> DeleteWeightPriceListById(int weightPriceListId);
        Task<WeightPriceList?> AddNewWeightPriceList(WeightPriceList weightPriceList);
    }
}
