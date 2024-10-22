using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
	public class Feedback
	{
        [Key]
        public int FeedbackId { get; set; } // PK
        [Required]
        public required string Comment { get; set; }
        public required int Rating { get; set; }
        public DateTime CreatedAt { get; set; } // Include CreatedAt
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt
        public int OrderId { get; set; } // FK
        public int CustomerId { get; set; } // FK
        // Link between Order and Customer
        public Orders Orders { get; set; } = null!;
        public Customer Customer { get; set; } = null!;
    }
}

