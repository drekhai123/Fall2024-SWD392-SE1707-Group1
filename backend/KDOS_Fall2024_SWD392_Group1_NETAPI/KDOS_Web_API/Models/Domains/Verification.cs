using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
	public class Verification
	{
        [Key]
        public int VerificationId { get; set; }
        required public int AccountId { get; set; }
        required public string Token { get; set; }
        required public DateTime ExpiredDate { get; set; }
        public Account Account { get; set; } = null!;
    }
}

