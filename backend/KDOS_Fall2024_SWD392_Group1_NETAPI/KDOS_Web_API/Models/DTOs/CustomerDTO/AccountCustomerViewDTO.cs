using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs.CustomerDTO.CustomerDTO
{
    public class AccountCustomerViewDTO
    {
        required public string Email { get; set; }
        required public string UserName { get; set; }
    }
}

