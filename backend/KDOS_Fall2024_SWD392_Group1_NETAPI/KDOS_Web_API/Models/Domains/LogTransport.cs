using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
    public class LogTransport
    {
        [Key]
        public int LogTransportId { get; set; }
        public DateTime Time { get; set; }
        public required string Location { get; set; }
        public int TransportId { get; set; } // FK to Transport table
        public int CustomerId { get; set; } // FK to Customer table
        public Transport? Transport { get; set; } // Navigation property to Transport
        public Customer? Customer { get; set; }
    }
}
