using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class TransportOrderIdDTO
	{
        public int TransportId { get; set; }
        public ICollection<OrderIdOnlyDTO>? Orders { get; set; }
    }
}

