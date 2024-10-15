﻿using System;
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
			CreateMap<AddNewAccountDTO, Account>().ReverseMap()
				.ForMember(x => x.Password, option => option.Ignore())
				.ForMember(x => x.Banned, option => option.Ignore())// Manually set the ban as false
				.ForMember(x=>x.Role, option => option.Ignore());// Manually set the role dependent on the need

            CreateMap<UpdateAccountDTO, Account>().ReverseMap()
				.ForMember(x=>x.Password,option=>option.Ignore());
			// Customer Mapping
			CreateMap<Customer, CustomerDTO>();
			CreateMap<UpdateCustomerDTO, Customer>().ReverseMap()
                .ForMember(x => x.UpdatedAt,option=>option.Ignore()); // Ignore the Create/Update date when mapping so we can do it manually
			CreateMap<AddNewCustomerDTO, Customer>().ReverseMap()
                .ForMember(x => x.CreatedAt,option=>option.Ignore())
                .ForMember(x => x.CreatedAt, option => option.Ignore());
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
			// KoiFish
			CreateMap<KoiFish, KoiFishDTO>().ReverseMap();
            CreateMap<KoiFish, AddNewKoiFishDTO>().ReverseMap();
            // BLog
        }
    }
}
