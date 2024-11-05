using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Cryptography.Xml;

namespace KDOS_Web_API.Repositories
{
    public class SQLLogTransportRepository : ILogTransportRepository
    {
        private readonly KDOSDbContext logTransportContext;
        public SQLLogTransportRepository(KDOSDbContext logTransportContext)
        {
            this.logTransportContext = logTransportContext;
        }

        public async Task<LogTransport> CreateLogTransportAsync(LogTransport logTransport)
        {
            await logTransportContext.LogTransport.AddAsync(logTransport);
            await logTransportContext.SaveChangesAsync();
            return logTransport;
        }

        public async Task<List<LogTransport>> GetAllLogTransportsAsync()
        {
            return await logTransportContext.LogTransport.ToListAsync();
        }

        public async Task<LogTransport?> GetLogTransportByIdAsync(int id)
        {
            return await logTransportContext.LogTransport.FindAsync(id);
        }

        public async Task<List<LogTransport>> GetLogTransportByCustomerId(int id)
        {
            var logTransportList = await logTransportContext.LogTransport.Where(x => x.CustomerId == id).ToListAsync();
            return logTransportList;
        }
        public async Task<List<LogTransport>> GetTransportLogsByTransportId(int transportId)
        {
            return await logTransportContext.LogTransport
                .Where(x => x.TransportId == transportId)
                .ToListAsync();
        }
    }
}
