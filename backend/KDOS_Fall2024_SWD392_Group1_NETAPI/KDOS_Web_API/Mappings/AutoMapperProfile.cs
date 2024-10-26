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
            // Verification
                // CreateMap<Verification, VerificationDTO>().ReverseMap(); Don't think of using this
			// Account Mapping
			CreateMap<Account, AccountDTO>().ReverseMap();
			CreateMap<AddNewAccountDTO, Account>().ReverseMap()
				.ForMember(x => x.Password, option => option.Ignore())
				.ForMember(x => x.Banned, option => option.Ignore())// Manually set the ban as false
				.ForMember(x=>x.Role, option => option.Ignore());// Manually set the role dependent on the need
			CreateMap<Account, BanAccountDTO>().ReverseMap();
			CreateMap<UpdateAccountDTO, Account>().ReverseMap();
            CreateMap<Account, AccountCustomerViewDTO>().ReverseMap();
            // Customer Mapping
            CreateMap<Customer, CustomerDTO>();
			CreateMap<UpdateCustomerDTO, Customer>().ReverseMap()
                .ForMember(x => x.UpdatedAt,option=>option.Ignore()); // Ignore the Create/Update date when mapping so we can do it manually
			CreateMap<AddNewCustomerDTO, Customer>().ReverseMap()
                .ForMember(x => x.CreatedAt,option=>option.Ignore())
                .ForMember(x => x.UpdatedAt, option => option.Ignore());
            CreateMap<CustomerAccountDTO, Customer>().ReverseMap();
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
            CreateMap<Orders, UpdateOnlyOrderStatusDTO>()
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
            CreateMap<Orders, OrdersDTO>().ReverseMap();
            CreateMap<Orders, UpdateOrderDTO>().ReverseMap();
            CreateMap<Orders, AddNewOrderDTO>()
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()) // Ignore if you're setting it manually
            .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.DeliveryStatus, opt => opt.Ignore())
            .ForMember(dest => dest.PaymentStatus, opt => opt.Ignore()).ReverseMap();
            // OrderDetails
            CreateMap<OrderDetails, OrderDetailsDTO>().ReverseMap();
            CreateMap<OrderDetails, AddNewOrderDetailsDTO>().ReverseMap();
            
            // HealthUpdate
            CreateMap<HealthStatus, HealthStatusDTO>().ReverseMap();
            CreateMap<HealthStatus, UpdateHealthStatusDTO>().ReverseMap();
            CreateMap<HealthStatus, AddNewHealthStatusDTO>().ReverseMap().ForMember(x=> x.Date, option=> option.Ignore());
            // KoiFish
            CreateMap<KoiFish, KoiFishDTO>().ReverseMap();
            CreateMap<KoiFish, AddNewKoiFishDTO>().ReverseMap();
            // FishProfile
            CreateMap<FishProfile, FishProfileDTO>().ReverseMap();
            CreateMap<FishProfile, UpdateFishProfileDTO>().ReverseMap();
            CreateMap<FishProfile, AddNewFishProfileDTO>().ReverseMap();
            // Feedback
            CreateMap<Feedback, FeedbackDTO>().ReverseMap();
            CreateMap<Feedback, AddNewFeedBackDTO>().ReverseMap()
                .ForMember(dest=>dest.CreatedAt,opt=>opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
            CreateMap<Feedback, UpdateFeedBackDTO>().ReverseMap()
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
            // BLog
        }
    }
}

