using KDOS_Web_API.Models;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;
using Mysqlx.Crud;

namespace KDOS_Web_API.Datas
{
    public class KDOSDbContext : DbContext
    {
        public DbSet<OrderDetails> OrderDetails { get; set; } // mockup for mirgration Table creator
        public DbSet<HealthStatus> HealthStatus { get; set; }
        public DbSet<KoiFish> KoiFish { get; set; }
        public DbSet<Account> Account { get; set; }
        public DbSet<Verification> Verification { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<DeliveryStaff> DeliveryStaff { get; set; }
        public DbSet<FishProfile> FishProfile { get; set; }
        public DbSet<Feedback> Feedback { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Verification>()
               .HasOne(c => c.Account)           // A Verification has one Account
               .WithOne(v => v.Verification)         // An Account has ONLY one Verification at a time
               .HasForeignKey<Verification>(v => v.AccountId)  // Verification holds the foreign key
               .OnDelete(DeleteBehavior.Cascade);  //
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
            modelBuilder.Entity<OrderDetails>()
                .HasOne(k => k.FishProfile) // Each OrderDetails references one KoiFish
                .WithOne(od => od.OrderDetails)
                .HasForeignKey<OrderDetails>(od => od.FishProfileId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: Cascade delete if needed
            modelBuilder.Entity<HealthStatus>()
                .HasOne(od => od.OrderDetails) // Each OrderDetails references one KoiFish
                .WithMany(st => st.HealthStatus)
                .HasForeignKey(st => st.OrderDetailsId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: Cascade delete if needed
            modelBuilder.Entity<KoiFish>() 
                .HasMany(pro => pro.FishProfile) // Each Fish references one Type of Koi 
                .WithOne(koi => koi.KoiFish)
                .HasForeignKey(st => st.KoiFishId);
            modelBuilder.Entity<FishProfile>()
                .HasOne(cus => cus.Customer) // Each Fish Can be own by one Customer
                .WithMany(pro => pro.FishProfiles) //one Customer can own many fishes
                .HasForeignKey(st => st.CustomerId);
            modelBuilder.Entity<Feedback>() // Each Order Can have one feedback
                .HasOne(or => or.Orders)
                .WithOne(fe => fe.Feedback)
                .HasForeignKey<Feedback>(x => x.OrderId);
            modelBuilder.Entity<Feedback>() //one Customer can have many feedbacks
                .HasOne(cus => cus.Customer)
                .WithMany(fe => fe.Feedback)
                .HasForeignKey(x => x.CustomerId);
        }
        public KDOSDbContext(DbContextOptions<KDOSDbContext> options) : base(options)
        {
        }

    }

}
