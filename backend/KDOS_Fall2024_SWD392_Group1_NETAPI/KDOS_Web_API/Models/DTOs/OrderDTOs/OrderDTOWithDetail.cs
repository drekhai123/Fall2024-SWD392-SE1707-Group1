using System;
using KDOS_Web_API.Models.Enum;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs.OrderDTOs
{
	public class OrderDTOWithDetail
	{
        public int OrderId { get; set; }

  
        public required string SenderName { get; set; }
      
        public required string SenderAddress { get; set; }

        public required string SenderPhoneNumber { get; set; }

      
        public required string RecipientAddress { get; set; }

    
        public required string RecipientName { get; set; }


        public required string RecipientPhoneNumber { get; set; }


        public required string RecipientEmail { get; set; }

 
        public PaymentMethod PaymentMethod { get; set; }

        public PaymentStatus PaymentStatus { get; set; }
        public OrderStatus DeliveryStatus { get; set; }

        public required string DeliveryNote { get; set; }


        required public int Quantity { get; set; }
        required public double Distance { get; set; }
        required public double TotalWeight { get; set; }
        required public double TotalCost { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int DistancePriceListId { get; set; }
        public int WeightPriceListId { get; set; }
        public int CustomerId { get; set; }
        public int TransportId { get; set; }
        public ICollection<OrderDetailsDTO>? OrderDetails { get; set; }
    }
}

