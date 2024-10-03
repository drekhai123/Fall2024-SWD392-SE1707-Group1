using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class CustomerViewAccountDTO
	{
        required public String Email { get; set; }
        required public String UserName { get; set; }
        required public String Password { get; set; }
    }
}

