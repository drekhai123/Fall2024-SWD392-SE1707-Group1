using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface ILogTransportRepository
    {
        Task<List<LogTransport>> GetAllLogTransportsAsync();
        Task<LogTransport?> GetLogTransportByIdAsync(int id);
        Task<LogTransport> CreateLogTransportAsync(LogTransport logTransport);
        Task<List<LogTransport>> GetLogTransportByCustomerId(int id);
    }
}
