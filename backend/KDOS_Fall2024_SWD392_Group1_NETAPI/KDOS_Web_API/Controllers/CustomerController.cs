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
            // This method get data DIRECTLY from database -> not best practice
           var customerList = customerContext.Customer.ToList();
            return Ok(customerList);
        }
        // GET 1 customer by ID
        [HttpGet]
        [Route("{customerId}")] // get the "value" from the parameter
        public IActionResult GetCustomerById([FromRoute]int customerId) //Identify this value is get from Route -> ALL NAMING form route and parameter must match
        {
            //var customer = customerContext.Customer.Find(customerId); // Method will only work with fidning [Key] like Id
            var customer = customerContext.Customer.FirstOrDefault(x => x.CustomerId == customerId); // Method will  work with ALL property you want to seach: name, add, phone, 
            if (customer == null)
            {
                return NotFound(); //return 404
            }
            return Ok(customer); //return 200 ok
        }

    }
}

