using System;
namespace KDOS_Web_API.Models
{
	public class Staff
	{
        public Guid StaffId { get; set; }
         public String? StaffName { get; set; }
         public int Age { get; set; }
         public String? Gender { get; set; }
         public String? Email { get; set; }
         public String? PhoneNumber { get; set; }
    }
}

