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
        public DbSet<OrderDetails> OrderDetails { get; set; } // mockup for mirgration Table creator
        public DbSet<KoiFish> KoiFish { get; set; }
        public DbSet<Account> Account { get; set; }
        public DbSet<Staff> Staff { get; set; }
    }
}
