using KDOS_Web_API.Models;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;
using Mysqlx.Crud;

namespace KDOS_Web_API.Datas
{
    public class KDOSDbContext : DbContext
    {
        public DbSet<OrderDetails> OrderDetails { get; set; } // mockup for mirgration Table creator
        public DbSet<KoiFish> KoiFish { get; set; }
        public DbSet<Account> Account { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Orders> Orders { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuring one-to-one relationship between Customer and Account
            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Account)           // A Customer has one Account
                .WithOne(a => a.Customer)         // An Account has one Customer
                .HasForeignKey<Customer>(c => c.AccountId)  // Customer holds the foreign key
                .OnDelete(DeleteBehavior.Cascade);  // Optional: cascade delete when Customer is deleted Meaning delete Account will Delete Customer or Visersa
            // Configuring one-to-one relationship between Staff and Account
            modelBuilder.Entity<Staff>()
                .HasOne(s => s.Account)           // A Staff has one Account
                .WithOne(a => a.Staff)         // An Account has one Staff
                .HasForeignKey<Staff>(s => s.AccountId)  // Staff holds the foreign key
                .OnDelete(DeleteBehavior.Cascade);  // Optional: cascade delete when Staff is deleted Meaning delete Account will Delete Staff or Visersa
            modelBuilder.Entity<DeliveryStaff>()
                .HasOne(s => s.Account)           // A DeliveryStaff has one Account
                .WithOne(a => a.DeliveryStaff)         // An Account has one DeliveryStaff
                .HasForeignKey<DeliveryStaff>(s => s.AccountId)  // DeliveryStaff holds the foreign key
                .OnDelete(DeleteBehavior.Cascade);  // Optional: cascade delete when Staff is deleted Meaning delete Account will Delete DeliveryStaff or Visersa
            modelBuilder.Entity<Orders>()
                .HasOne(o => o.Transport) // One Transport can have Many orders
                .WithMany(tr => tr.Orders)
                .HasForeignKey(o => o.TransportId);
            modelBuilder.Entity<OrderDetails>()
                .HasOne(od => od.Order) // Each OrderDetails references one Order
                .WithMany(o => o.OrderDetails) // An Order can have many OrderDetails
                .HasForeignKey(od => od.OrderId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: Cascade delete if needed
            modelBuilder.Entity<KoiFish>()
                .HasOne(od => od.OrderDetails) // Each OrderDetails references one KoiFish
                .WithMany(k => k.KoiFish) // Assuming KoiFish has no navigation property back to OrderDetails
                .HasForeignKey(od => od.OrderDetailsId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: Cascade delete if needed

        }
        public KDOSDbContext(DbContextOptions<KDOSDbContext> options) : base(options)
        {
        }

    }

}
