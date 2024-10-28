namespace KDOS_Web_API.Models.DTOs
{
    public class UpdateLogTransportDTO
    {
        public DateTime Time { get; set; }
        public required string Location { get; set; }
    }
}
