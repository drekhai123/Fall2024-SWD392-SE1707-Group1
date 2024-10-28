namespace KDOS_Web_API.Models.DTOs
{
    public class LogTransportDTO
    {
        public int LogTransportId { get; set; }
        public DateTime Time { get; set; }
        public required string Location { get; set; }
        public int TransportId { get; set; } // FK to Transport table
        public int CustomerId { get; set; } // FK to Transport table
    }
}
