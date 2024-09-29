using KDOS_Web_API.Models;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Datas
{
    public class KDOSDbContext : DbContext
    {
        public KDOSDbContext(DbContextOptions<KDOSDbContext> options) : base(options)
        {
        }
        public DbSet<Customer> Customers { get; set; }
    }
}
