using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KDOS.Data.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    // Route: https//localhost:portnumber /api/customers
    [Route("api/[controller]API")]
    [ApiController]
    public class CustomersController : Controller
    {
        // GET: /<controller>/
        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            //string[] customerName = new string[] { "Reimu", "Marisa", "Sakuya" };
            //return Ok(customerName);
            var customerList = new List<Customer>
            { new Customer
                {
                    CustomerId = Guid.NewGuid(),
                    CustomerName = "Hakurei Reimu",
                    Addresses= new string[]{"Hakurei Shrine, Gensokyo"},
                    Age=19,
                    Email="hakureimoney@gensokyo.com",


                },
                new Customer
                {
                    CustomerId = Guid.NewGuid(),
                    CustomerName = "Sakuya Izayoi",
                    Addresses= new string[]{"S.D.M, Gensokyo"},
                    Age=23,
                    Email="inusakuya@gensokyo.com",
                }
            };
            return Ok(customerList);

        }
    }
}
