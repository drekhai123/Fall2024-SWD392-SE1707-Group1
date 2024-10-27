using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.Enum;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
    public class SQLTransportRepository : ITransportRepository
    {
        private readonly KDOSDbContext transportContext;
        public SQLTransportRepository(KDOSDbContext transportContext)
        {
            this.transportContext = transportContext;
        }

        public async Task<Transport?> AddNewTransport(Transport transport)
        {
            await transportContext.Transport.AddAsync(transport);
            await transportContext.SaveChangesAsync();
            return transport;
        }

        public async Task<Transport?> DeleteTransport(int id)
        {
            // Find the existing order by ID
            var transportToDelete = await transportContext.Transport.FirstOrDefaultAsync(o => o.TransportId == id);

            // If the order doesn't exist, return null
            if (transportToDelete == null)
            {
                return null;
            }

            // Remove the order from the context and save changes
            transportContext.Transport.Remove(transportToDelete);
            await transportContext.SaveChangesAsync();

            // Return the deleted order
            return transportToDelete;
        }

        public async Task<List<Transport>> GetAllTransport()
        {
            return await transportContext.Transport.ToListAsync();
        }

        public async Task<Transport?> GetTransportById(int id)
        {
            return await transportContext.Transport.FindAsync(id);
        }

        public async Task<List<Transport>> GetTransportByStatus(TransportStatus status)
        {
            // Find all orders with the specified status
            var transports = await transportContext.Transport
                .Where(o => o.Status == status)
                .ToListAsync();

            return transports;
        }

        public async Task<Transport?> UpdateTransport(int id, Transport transport)
        {
            var transportModel = await transportContext.Transport.FindAsync(id);
            if (transportModel == null)
            {
                return null;
            }
            transportModel.StaffId = transport.StaffId; 
            transportModel.DeliveryStaffId = transport.DeliveryStaffId;
            transportModel.HealthCareStaffId = transport.HealthCareStaffId;
            transportModel.Status = transport.Status;

            await transportContext.SaveChangesAsync();
            return transportModel;
        }
    }
}
