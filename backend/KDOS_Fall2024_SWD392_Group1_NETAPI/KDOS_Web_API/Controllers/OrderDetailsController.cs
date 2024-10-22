using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    public class OrderDetailsController : ControllerBase
    {
        private readonly IOrderDetailsRepository orderDetailsRepository;
        private readonly IMapper mapper;

        public OrderDetailsController(IOrderDetailsRepository orderDetailsRepository, IMapper mapper)
        {
            this.orderDetailsRepository = orderDetailsRepository;
            this.mapper = mapper;
        }

    }
}

