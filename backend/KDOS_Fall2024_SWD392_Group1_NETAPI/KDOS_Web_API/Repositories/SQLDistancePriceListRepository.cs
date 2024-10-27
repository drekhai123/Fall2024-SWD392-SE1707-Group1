using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
    public class SQLDistancePriceListRepository : IDistancePriceListRepository
    {
        private readonly KDOSDbContext distancePriceListContext;
        public SQLDistancePriceListRepository(KDOSDbContext distancePriceListContext)
        {
            this.distancePriceListContext = distancePriceListContext;
        }

        public async Task<DistancePriceList?> AddNewDistancePriceList(DistancePriceList distancePriceList)
        {
            await distancePriceListContext.DistancePriceList.AddAsync(distancePriceList);
            await distancePriceListContext.SaveChangesAsync();
            return distancePriceList;
        }

        public async Task<DistancePriceList?> DeleteDistancePriceListById(int distancePriceListId)
        {
            // Find the existing weight by ID
            var distancePriceToDelete = await distancePriceListContext.DistancePriceList.FirstOrDefaultAsync(o => o.DistancePriceListId == distancePriceListId);

            // If the order doesn't exist, return null
            if (distancePriceToDelete == null)
            {
                return null;
            }

            // Remove the order from the context and save changes
            distancePriceListContext.DistancePriceList.Remove(distancePriceToDelete);
            await distancePriceListContext.SaveChangesAsync();

            // Return the deleted order
            return distancePriceToDelete;
        }

        public async Task<List<DistancePriceList>> GetDistancePriceList()
        {
            return await distancePriceListContext.DistancePriceList.ToListAsync();
        }

        public async Task<DistancePriceList?> GetDistancePriceListById(int distancePriceListId)
        {
            return await distancePriceListContext.DistancePriceList.FindAsync(distancePriceListId);
        }

        public async Task<DistancePriceList?> UpdateDistancetPriceList(int distancePriceListId, DistancePriceList distancePriceList)
        {
            var distancePriceModel = await distancePriceListContext.DistancePriceList.FindAsync(distancePriceListId);
            if (distancePriceModel == null)
            {
                throw new KeyNotFoundException($"Distance PriceList with ID {distancePriceModel} not found.");
            }

            // Update only the properties that need to be changed
            distancePriceModel.MinRange = distancePriceList.MinRange;
            distancePriceModel.MaxRange = distancePriceList.MaxRange;
            distancePriceModel.Price = distancePriceList.Price;

            // No changes to nested collections or properties unless intended

            await distancePriceListContext.SaveChangesAsync();
            return distancePriceModel;
        }
    }
}
