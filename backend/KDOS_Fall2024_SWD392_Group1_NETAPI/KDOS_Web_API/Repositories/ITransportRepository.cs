using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Repositories
{
    public interface ITransportRepository
    {
      Task<List<Transport>> GetAllTransport();
        Task<Transport?> GetTransportById(int id);
        Task<Transport?> AddNewTransport(Transport transport);
        Task<Transport?> UpdateTransport(int id, Transport transport);
        Task<Transport?> UpdateTransportStatus(int id, Transport transport);
        Task<Transport?> DeleteTransport(int id);
        Task<Transport?> GetByDeliveryStaff(int id);
        Task<List<Transport>> GetTransportByStatus(TransportStatus status);
        Task<Transport?> GetActiveTransportByOrderStatus(int id);
        Task<Transport?> GetByHealthCareStaff(int id);
    }
}
