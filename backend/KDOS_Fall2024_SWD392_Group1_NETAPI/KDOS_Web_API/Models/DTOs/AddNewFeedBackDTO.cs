using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class AddNewFeedBackDTO
	{
        
        public required string Comment { get; set; }
        public required int Rating { get; set; }
        public DateTime CreatedAt { get; set; } // Include CreatedAt
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt
        public required int OrderId { get; set; } // FK
        public required int CustomerId { get; set; } // FK
    }
}

