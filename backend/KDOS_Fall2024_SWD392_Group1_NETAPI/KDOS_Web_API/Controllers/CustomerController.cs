using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase    {
        private readonly KDOSDbContext customerContext;
        private readonly ICustomerRepository customerRepository;
        private readonly IMapper mapper;

        public CustomerController(KDOSDbContext customerContext, ICustomerRepository customerRepository, IMapper mapper)
        {
            this.customerContext = customerContext;
            this.customerRepository = customerRepository;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCustomer()
        {
            // This method get data DIRECTLY from database -> not best practice
            var customerList = await customerRepository.GetAllCustomer();
           // Auto mapper
            var customerDto = mapper.Map<List<CustomerDTO>>(customerList);
            // Following Best Practice
            return Ok(customerDto);
        }

        [HttpPost] // Post for create - FromBody is the data send from Client in the Respone Body
        public async Task<IActionResult> AddNewCustomer([FromBody] AddNewCustomerDTO addNewCustomerDTO)
        {
            // using the DTO to convert Model
            var customerModel =  mapper.Map<Customer>(addNewCustomerDTO);
            var newCustomer = await customerRepository.AddNewCustomer(customerModel);
            if (newCustomer == null)
            {
                return NotFound();
            }
            //Map Model back to DTO
            var customerDto = mapper.Map<CustomerDTO>(customerModel);
            // Follow best practice
            return CreatedAtAction(nameof(GetCustomerById), new { customerId = customerModel.CustomerId }, customerDto); // Respone with code 201 - Created Complete
            //CreatedAtAction will trigger the action GetCustomerById to search for the created customer in the db using the id generate by the EF. Then convert the data to a DTO and respone that bakc to client. So we can know what dot created 
        }
        
        [HttpPost]
        [Route("searchbyname")]
        public async Task<IActionResult> FindCustomerByName([FromBody] String customerName)
        {
            //Find by name
            var customerModel = await customerContext.Customer.FirstOrDefaultAsync(x=>x.CustomerName==customerName); // enforce ! to make sure name is not null
            if (customerModel == null)
            {
                return NotFound();
            }
            else
            {
                //Turn Model to DTO
                var customerDto = mapper.Map<CustomerDTO>(customerModel);
                return Ok(customerDto);
            }
        }



        // GET 1 customer by ID
        [HttpGet]
        [Route("{customerId}")] // get the "value" from the parameter
        public async Task<IActionResult> GetCustomerById([FromRoute]int customerId) //Identify this value is get from Route -> ALL NAMING form route and parameter must match
        {  
            var customerModel = await customerRepository.GetCustomerById(customerId);
            if (customerModel == null)
            {
                return NotFound(); //return 404
            }
            else
            {
                //Get Customer Account info
                var accountModel = await customerRepository.GetAccountByCustomer(customerModel.AccountId);
                var customerDto = mapper.Map<CustomerDTO>(customerModel);
                var accountDto = mapper.Map<CustomerViewAccountDTO>(accountModel);
                // TODO
                return Ok(customerDto); //return 200 ok
            }
           
        }
        // PUT - Update a customer through their Id
        [HttpPut]
        [Route("{customerId}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute] int customerId, [FromBody] UpdateCustomerDTO updateCustomerDto)
        {
            //Find the customer with the Id
            var customerModel = mapper.Map<Customer>(updateCustomerDto);
            customerModel = await customerRepository.UpdateCustomer(customerId, customerModel);
            if(customerModel == null)
            {
                return NotFound();
            }
            else
            {
                // Turn Model back to DTO
                var customerDto = mapper.Map<CustomerDTO>(customerModel);
                return Ok(customerDto);
            }
        }
        [HttpDelete]
        [Route("{customerId}")]
        public async Task<IActionResult> DeleteCustomer([FromHeader] int customerId)
        {
            var deleteCustomer = await customerRepository.DeleteCustomer(customerId);
            if (deleteCustomer == null)
            {
                return NotFound();
            }
            else
            {
                var customerDto = mapper.Map<CustomerDTO>(deleteCustomer);
                return Ok(customerDto);
            }
            
        }
    }
}

