using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
    public class FeedbackDTO
	{
        [Key]
        public int FeedbackId { get; set; } // PK
        [Required]
        public required string Comment { get; set; }
        public required int Rating { get; set; }
        public DateTime CreatedAt { get; set; } // Include CreatedAt
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt
        // Link between Order and Customer
        public CustomerDTO Customer { get; set; } = null!;
    }
}

