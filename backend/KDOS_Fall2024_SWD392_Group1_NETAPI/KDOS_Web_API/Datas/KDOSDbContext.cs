using KDOS_Web_API.Models;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Datas
{
    public class KDOSDbContext : DbContext
    {
        public DbSet<OrderDetails> OrderDetails { get; set; } // mockup for mirgration Table creator
        public DbSet<KoiFish> KoiFish { get; set; }
        public DbSet<Account> Account { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Customer> Customer { get; set; }
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
                .HasOne(s => s.Account)           // A Customer has one Account
                .WithOne(a => a.Staff)         // An Account has one Customer
                .HasForeignKey<Staff>(s => s.AccountId)  // Customer holds the foreign key
                .OnDelete(DeleteBehavior.Cascade);  // Optional: cascade delete when Staff is deleted Meaning delete Account will Delete Customer or Visersa
        }
        public KDOSDbContext(DbContextOptions<KDOSDbContext> options) : base(options)
        {
        }
       
    }
  
}
