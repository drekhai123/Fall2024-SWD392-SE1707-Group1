using AutoMapper;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using KDOS_Web_API.Services.MailingService;
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
        private readonly IMailingService mailingService;

        public CustomerController(KDOSDbContext customerContext, ICustomerRepository customerRepository, IMapper mapper,  IMailingService mailingService)
        {
            this.customerContext = customerContext;
            this.customerRepository = customerRepository;
            this.mapper = mapper;
            this.mailingService = mailingService;
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
            customerModel.CreatedAt = DateTime.Now; //Manually set the current time, ignore automapper
            customerModel.UpdatedAt = DateTime.Now;
            var newCustomer = await customerRepository.AddNewCustomer(customerModel);
            if (newCustomer == null)
            {
                return NotFound();
            }
            //Map Model back to DTO
            //Get Customer Account info
            var accountModel = await customerRepository.GetAccountByCustomer(customerModel.AccountId);
            if (accountModel != null)
            {
                var customerDto = mapper.Map<CustomerAccountDTO>(customerModel);
                customerDto.Account = new AccountCustomerViewDTO
                {
                    Email = accountModel.Email,
                    UserName = accountModel.UserName
                };
                await mailingService.SendRegisterMail(accountModel);
                // Follow best practice
                return CreatedAtAction(nameof(GetCustomerById), new { customerId = customerModel.CustomerId }, customerDto); // Respone with code 201 - Created Complete                                                                                                                       //CreatedAtAction will trigger the action GetCustomerById to search for the created customer in the db using the id generate by the EF. Then convert the data to a DTO and respone that bakc to client. So we can know what dot created 
            }
            return NotFound(); //return 404
        }
        [HttpPost]
        [Route("searchbyname")]
        public async Task<IActionResult> FindCustomerByName([FromBody] String customerName)
        {
            //Find by name
            var customerModel = await customerRepository.GetCustomerByName(customerName);
            if (!customerModel.Any()) // IsEmptyOrNull for List
            {
                return NotFound();
            }
            else
            {
                //Turn Model to DTO
                var customerDto = mapper.Map<List<CustomerDTO>>(customerModel);
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
                if (accountModel != null)
                {
                    var customerDto = mapper.Map<CustomerAccountDTO>(customerModel);
                    customerDto.Account = new AccountCustomerViewDTO
                    {
                        Email = accountModel.Email,
                        UserName = accountModel.UserName
                    };

                    return Ok(customerDto); //return 200 ok
                }
                return NotFound(); //return 404
            }
        }
        // PUT - Update a customer through their Id
        [HttpPut]
        [Route("{customerId}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute] int customerId, [FromBody] UpdateCustomerDTO updateCustomerDto)
        {
            //Find the customer with the Id
            var customerModel = mapper.Map<Customer>(updateCustomerDto);
            customerModel.UpdatedAt = DateTime.Now;
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
        public async Task<IActionResult> DeleteCustomer([FromRoute] int customerId)
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

