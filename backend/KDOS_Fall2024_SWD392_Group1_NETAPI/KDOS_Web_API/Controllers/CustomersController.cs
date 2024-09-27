using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KDOS.Data.Models;
using KDOS.Data.Data;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    // Route: https//localhost:portnumber /api/customers
    [Route("api/[controller]API")]
    [ApiController]
    public class CustomersController : Controller
    {
        // GETALLcustomer /<controller>/
        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            //string[] customerName = new string[] { "Reimu", "Marisa", "Sakuya" };
            //return Ok(customerName);
            var customerData = new CustomerData();
            var customerList = customerData.GetAllData();
            return Ok(customerList);

        }
    }
}
