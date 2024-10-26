using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
    public class UpdateOnlyOrderStatusDTO
    {
        public OrderStatus Status { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
