using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("")]
    public class DeliveryStaffController : ControllerBase
    {
        private readonly KDOSDbContext deliveryStaffContext;
        private readonly IDeliveryStaffRepository deliveryStaffRepository;
        private readonly IMapper mapper;

        public DeliveryStaffController(KDOSDbContext deliveryStaffContext, IDeliveryStaffRepository deliveryStaffRepository, IMapper mapper)
        {
            this.deliveryStaffContext = deliveryStaffContext;
            this.deliveryStaffRepository = deliveryStaffRepository;
            this.mapper = mapper;
        }
    }
}

