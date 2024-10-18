using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class AccountCustomerViewDTO
	{
        required public String Email { get; set; }
        required public String UserName { get; set; }
    }
}

