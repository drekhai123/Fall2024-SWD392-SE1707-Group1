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
        readonly CustomerData customerData = new CustomerData();
        // GETALLcustomer /<controller>/
        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            //string[] customerName = new string[] { "Reimu", "Marisa", "Sakuya" };
            //return Ok(customerName);
            List<Customer> customerList = customerData.GetAllData();
            return Ok(customerList);

        }
        // Get 1 Single Customer by Id
        // Get Method ->  https//localhost:portnumber /api/customers/:id
        [HttpGet]
        [Route("{id:Guid}")]
        public IActionResult GetCustomerById(Guid id)
        {
            Customer foundCustomer = customerData.GetCustomerById(id);
            if(foundCustomer == null)
            {
                return NotFound();
            }
            return Ok(foundCustomer);
        }
        [HttpGet]
        [Route("{name:String}")]
        public IActionResult GetCustomerByName(String name)
        {
            Customer foundCustomer = customerData.GetCustomerByName(name);
            if (foundCustomer == null)
            {
                return NotFound();
            }
            return Ok(foundCustomer);
        }
    }

    

}
