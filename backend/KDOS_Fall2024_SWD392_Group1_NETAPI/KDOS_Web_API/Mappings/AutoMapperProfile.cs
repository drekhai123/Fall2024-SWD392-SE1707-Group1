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
			CreateMap<Account, AccountDTO>().ReverseMap();
			CreateMap<AddNewAccountDTO, Account>().ReverseMap();
			CreateMap<UpdateAccountDTO, Account>().ReverseMap();
			CreateMap<Account, AddNewAccountDTO>();
			CreateMap<Account, CustomerViewAccountDTO>();
			CreateMap<Staff, StaffDTO>().ReverseMap();
			CreateMap<Customer, CustomerDTO>();
		}
	}
}

