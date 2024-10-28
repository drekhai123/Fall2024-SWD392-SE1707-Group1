namespace KDOS_Web_API.Models.DTOs
{
    public class AddNewLogTransportDTO
    {
        public DateTime Time { get; set; }
        public required string Location { get; set; }
        public int TransportId { get; set; } // FK to Transport table
        public int CustomerId { get; set; } // FK to Transport table
        
    }
}
