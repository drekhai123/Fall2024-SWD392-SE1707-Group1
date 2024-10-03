using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models;
using KDOS_Web_API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase    {
        private readonly KDOSDbContext customerContext;

        public CustomerController(KDOSDbContext customerContext)
        {
            this.customerContext = customerContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCustomer()
        {
            // This method get data DIRECTLY from database -> not best practice
            var customerList = await customerContext.Customer.ToListAsync();
            var customerDto = new List<CustomerDTO>();
            foreach (Customer customer in customerList)
            {
                customerDto.Add(new CustomerDTO()
                {
                    AccountId = customer.AccountId,
                    CustomerId = customer.CustomerId,
                    CustomerName = customer.CustomerName,
                    Address = customer.Address,
                    Age = customer.Age,
                    Gender = customer.Gender,
                    PhoneNumber = customer.PhoneNumber
                });
            }
            // Following Best Practice
            return Ok(customerDto);
        }

        [HttpPost] // Post for create - FromBody is the data send from Client in the Respone Body
        public async Task<IActionResult> AddNewCustomer([FromBody] AddNewCustomerDTO addNewCustomerDTO)
        {
            // using the DTO to convert Model
            var accountModel = await customerContext.Account.FirstOrDefaultAsync(x => x.AccountId == addNewCustomerDTO.AccountId);
            if (accountModel == null || !accountModel.Role.Equals("customer"))
            {
                return NotFound("Error 404: Account Not Found");
                // Custom a response 
            }
            var customerExist = customerContext.Customer.FirstOrDefault(x => x.AccountId == addNewCustomerDTO.AccountId);
            if (customerExist != null)
            {
                return BadRequest("Error 400: Account Already Exist!!!");
                // Custom a response 
            }
            var customerModel = new Customer
            {
                AccountId = addNewCustomerDTO.AccountId, //Foreign Key Identify
                CustomerName = addNewCustomerDTO.CustomerName,
                Address = addNewCustomerDTO.Address,
                Age = addNewCustomerDTO.Age,
                Gender = addNewCustomerDTO.Gender,
                PhoneNumber = addNewCustomerDTO.PhoneNumber,
            };
            //using Model to create a Customer
            await customerContext.Customer.AddAsync(customerModel);
            //Save the Customer to the database. ID will auto increase by the EF
            await customerContext.SaveChangesAsync();
            //Map Model back to DTO
            var customerDto = new CustomerDTO
            {
                AccountId = accountModel.AccountId,
                CustomerId = customerModel.CustomerId,
                CustomerName = customerModel.CustomerName,
                Address = customerModel.Address,
                Age = customerModel.Age,
                Gender = customerModel.Gender,
                PhoneNumber = customerModel.PhoneNumber
            };
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
                var customerDto = new CustomerDTO
                {
                    AccountId = customerModel.AccountId,
                    CustomerId = customerModel.CustomerId,
                    CustomerName = customerModel.CustomerName,
                    Address = customerModel.Address,
                    Age = customerModel.Age,
                    Gender = customerModel.Gender,
                    PhoneNumber = customerModel.PhoneNumber
                };
                return Ok(customerDto);
            }
        }



        // GET 1 customer by ID
        [HttpGet]
        [Route("{customerId}")] // get the "value" from the parameter
        public async Task<IActionResult> GetCustomerById([FromRoute]int customerId) //Identify this value is get from Route -> ALL NAMING form route and parameter must match
        {
            //var customer = customerContext.Customer.Find(customerId); // Method will only work with fidning [Key] like Id
            var customer = await customerContext.Customer.FirstOrDefaultAsync(x => x.CustomerId == customerId); // Method will  work with ALL property you want to seach: name, add, phone,
            //follow best practice
            if (customer == null)
            {
                return NotFound(); //return 404
            }
            else
            {
                var customerDto = new CustomerDTO
                {
                    AccountId = customer.AccountId,
                    CustomerId = customer!.CustomerId,
                    CustomerName = customer.CustomerName,
                    Address = customer.Address,
                    Age = customer.Age,
                    Gender = customer.Gender,
                    PhoneNumber = customer.PhoneNumber,
                };

                return Ok(customerDto); //return 200 ok
            }
           
        }
        // PUT - Update a customer through their Id
        [HttpPut]
        [Route("{customerId}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute] int customerId, [FromBody] UpdateCustomerDTO updateCustomerDto)
        {
            //Find the customer with the Id
            var customerModel = await customerContext.Customer.FirstOrDefaultAsync(x => x.CustomerId == customerId);
            if(customerModel == null)
            {
                return NotFound();
            }
            else
            {
                // Map the DTO to Model
                customerModel.CustomerName = updateCustomerDto.CustomerName;
                customerModel.Age = updateCustomerDto.Age;
                customerModel.Address = updateCustomerDto.Address;
                customerModel.Gender = updateCustomerDto.Gender;
                customerModel.PhoneNumber = updateCustomerDto.PhoneNumber;
                await customerContext.SaveChangesAsync();
                // Turn Model back to DTO
                var customerDto = new CustomerDTO
                {
                    AccountId = customerModel.AccountId,
                    CustomerId = customerModel.CustomerId,
                    CustomerName = customerModel.CustomerName,
                    Address = customerModel.Address,
                    Age = customerModel.Age,
                    Gender = customerModel.Gender,
                    PhoneNumber = customerModel.PhoneNumber
                };
                return Ok(customerDto);
            }
        }
        [HttpDelete]
        [Route("{customerId}")]
        public async Task<IActionResult> DeleteCustomer([FromHeader] int customerId)
        {
            var deleteCustomer = await customerContext.Customer.FirstOrDefaultAsync(x => x.CustomerId == customerId);
            if (deleteCustomer == null)
            {
                return NotFound();
            }
            else
            {
                customerContext.Customer.Remove(deleteCustomer); // no async remove
                await customerContext.SaveChangesAsync();
                //Return the customer info got deleted back
                var customerDto = new CustomerDTO
                {
                    AccountId = deleteCustomer.AccountId,
                    CustomerId = deleteCustomer.CustomerId,
                    CustomerName = deleteCustomer.CustomerName,
                    Address = deleteCustomer.Address,
                    Age = deleteCustomer.Age,
                    Gender = deleteCustomer.Gender,
                    PhoneNumber = deleteCustomer.PhoneNumber
                };
                return Ok(customerDto);
            }
            
        }
    }
}

