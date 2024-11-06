using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateFeedBackDTO
	{
        public required string Comment { get; set; }
        public required int Rating { get; set; }
    }
}

