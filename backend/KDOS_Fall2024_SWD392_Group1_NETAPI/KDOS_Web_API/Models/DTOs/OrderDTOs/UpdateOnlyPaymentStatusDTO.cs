using System;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs.OrderDTOs
{
	public class UpdateOnlyPaymentStatusDTO
	{
        public PaymentStatus PaymentStatus { get; set; }
    }
}

