using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Cryptography.Xml;

namespace KDOS_Web_API.Repositories
{
    public class SQLWeightPriceListRepository : IWeightPriceListRepository
    {
        private readonly KDOSDbContext weightPriceListContext;
        public SQLWeightPriceListRepository(KDOSDbContext weightPriceListContext)
        {
            this.weightPriceListContext = weightPriceListContext;
        }

        public async Task<WeightPriceList?> AddNewWeightPriceList(WeightPriceList weightPriceList)
        {
            await weightPriceListContext.WeightPriceList.AddAsync(weightPriceList);
            await weightPriceListContext.SaveChangesAsync();
            return weightPriceList;
        }
        
        public async Task<WeightPriceList?> DeleteWeightPriceListById(int weightPriceListId)
        {
            // Find the existing weight by ID
            var weightPriceToDelete = await weightPriceListContext.WeightPriceList.FirstOrDefaultAsync(o => o.WeightPriceListId == weightPriceListId);

            // If the order doesn't exist, return null
            if (weightPriceToDelete == null)
            {
                return null;
            }

            // Remove the order from the context and save changes
            weightPriceListContext.WeightPriceList.Remove(weightPriceToDelete);
            await weightPriceListContext.SaveChangesAsync();

            // Return the deleted order
            return weightPriceToDelete;
        }

        public async Task<WeightPriceList?> GetWeightPriceListById(int weightPriceListId)
        {
            return await weightPriceListContext.WeightPriceList.FindAsync(weightPriceListId);
        }

        public async Task<List<WeightPriceList>> GetWeightPriceLists()
        {
            return await weightPriceListContext.WeightPriceList.ToListAsync();
        }

        public async Task<WeightPriceList?> UpdateWeightPriceList(int weightPriceListId, WeightPriceList weightPriceList)
        {
            var weightPriceModel = await weightPriceListContext.WeightPriceList.FindAsync(weightPriceListId);
            if (weightPriceModel == null)
            {
                throw new KeyNotFoundException($"WeightPriceList with ID {weightPriceListId} not found.");
            }

            // Update only the properties that need to be changed
            weightPriceModel.MinRange = weightPriceList.MinRange;
            weightPriceModel.MaxRange = weightPriceList.MaxRange;
            weightPriceModel.Price = weightPriceList.Price;

            // No changes to nested collections or properties unless intended

            await weightPriceListContext.SaveChangesAsync();
            return weightPriceModel;
        }
    }
}
