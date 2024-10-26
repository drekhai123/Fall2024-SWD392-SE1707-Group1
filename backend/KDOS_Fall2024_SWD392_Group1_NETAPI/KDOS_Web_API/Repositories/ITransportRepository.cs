using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface ITransportRepository
    {
      Task<List<Transport>> GetAllTransport();
        Task<Transport?> GetTransportById(int id);
        Task<Transport?> AddNewTransport(Transport transport);
        Task<Transport?> UpdateTransport(int id, Transport transport);
        Task<Transport?> DeleteTransport(int id);
        Task<List<Transport?>> GetTransportByDate(DateTime date);
        Task<List<Transport>> GetTransportByStatus( status);
    }
}
