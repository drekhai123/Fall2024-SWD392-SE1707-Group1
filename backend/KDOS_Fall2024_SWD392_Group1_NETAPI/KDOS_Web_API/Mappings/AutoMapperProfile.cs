using System;
using AutoMapper;
using KDOS_Web_API.Models;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;

namespace KDOS_Web_API.Mappings
{
	// Profile is part of the Automapper
	public class AutoMapperProfile:Profile
	{
		public AutoMapperProfile()
		{
			// Maping AccountModel to DTO -> and vise versa
			// Account Mapping
			CreateMap<Account, AccountDTO>().ReverseMap();
			CreateMap<AddNewAccountDTO, Account>().ReverseMap();
			CreateMap<UpdateAccountDTO, Account>().ReverseMap();
            // Customer Mapping
            CreateMap<Customer, CustomerDTO>();
			CreateMap<UpdateCustomerDTO, Customer>().ReverseMap();
			CreateMap<AddNewCustomerDTO, Customer>().ReverseMap();
            CreateMap<Account, CustomerViewAccountDTO>().ReverseMap();
            // Staff Mapping
            CreateMap<Staff, StaffDTO>().ReverseMap();
			CreateMap<AddNewStaffDTO, Staff>().ReverseMap();
			CreateMap<UpdateStaffDTO, Staff>().ReverseMap();
			// Delivery Staff Mapping
			CreateMap<DeliveryStaff, DeliveryStaffDTO>().ReverseMap();
            CreateMap<DeliveryStaff, AddNewDeliveryStaffDTO>().ReverseMap();
            CreateMap<DeliveryStaff, UpdateDeliveryStaffDTO>().ReverseMap();
			// Transport
			// Order
			// HealthUpdate
			// BLog
        }
	}
}

