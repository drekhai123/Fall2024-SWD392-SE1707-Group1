using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class VerificationDTO
	{
        required public int AccountId { get; set; }
        required public string Token { get; set; }
        required public DateTime ExpiredDate { get; set; }
    }
}

