using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly KDOSDbContext customerContext;

        public CustomerController(KDOSDbContext customerContext)
        {
            this.customerContext = customerContext;
        }
        [HttpGet]
        public IActionResult GetAllCustomer()
        {
           var customerList = customerContext.Customer.ToList();
            if(customerList == null)
            {
                return Ok();
            }
            return Ok(customerList);
        }

    }
}

