using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Principal;

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly KDOSDbContext accountContext;
        private readonly IAccountRepository accountRepository;
        private readonly IMapper mapper;
        private readonly IPasswordHasher<Account> passwordHasher;

        // Adding in the Repository Inject
        // Adding AutoMApper Service
        public AccountController(KDOSDbContext accountContext, IAccountRepository accountRepository, IMapper mapper, IPasswordHasher<Account> passwordHasher)
        {
            this.accountContext = accountContext;
            this.accountRepository = accountRepository;
            this.mapper = mapper;
            this.passwordHasher = passwordHasher;
        }
        [HttpGet]
        // Async Task!!! Async Task(IActionResult) -> Await... tolistAsync
        public async Task<IActionResult> GetALlAcount()
        {
            // Now we don't call the DB directly but through the Repository
            // var accountList = await accountContext.Account.ToListAsync();
            var accountList = await accountRepository.GetAllAccountAsync();
            //Use AutoMapper Turn Model to DTO
            var accountDto = mapper.Map<List<AccountDTO>>(accountList);
            return Ok(accountDto);
        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var accountModel = await accountRepository.Login(loginDTO.UserNameOrEmail); // Check account by email or username

            if (accountModel != null)
            {
                var verifyPassword = passwordHasher.VerifyHashedPassword(accountModel, accountModel.Password, loginDTO.Password); //Validate the hased password vs the password from FE, Return 1 if correct, 0 if failed
                if (verifyPassword == PasswordVerificationResult.Success) // =1 meaning success
                {
                    AccountDTO accountDTO = mapper.Map<AccountDTO>(accountModel);
                    return Ok(accountDTO);
                }
                else
                {
                    return Unauthorized("Error! Wrong Email/UserName or Password");
                }
            }
            else
            {
                return NotFound("Error! Wrong Email/UserName or Password");
            }

        }
        [HttpPost]
        [Route("AddCustomer")]
        public async Task<IActionResult> AddNewCustomerAccount([FromBody] AddNewAccountDTO addNewAccountDTO)
        {
            // Turn Data to Model With AutoMApper.ReverseMap
            var accountModel = mapper.Map<Account>(addNewAccountDTO);
            accountModel.Banned = false; // Default Not Banned... duh
            accountModel.Role = "customer"; //Set Role fixed as Customer
            accountModel.Password = passwordHasher.HashPassword(accountModel, addNewAccountDTO.Password); // Hashing the password sent back from FE
            accountModel = await accountRepository.AddNewAccount(accountModel);
            // Turn Model to DTO for returning a response
            var accountDto = mapper.Map<AccountDTO>(accountModel);
            return CreatedAtAction(nameof(GetAccountById), new { accountId = accountModel.AccountId }, accountDto);
        }
        [HttpPost]
        [Route("AddStaff")]
        public async Task<IActionResult> AddNewStaffAccount([FromBody] AddNewAccountDTO addNewAccountDTO)
        {
            // Turn Data to Model With AutoMApper.ReverseMap
            var accountModel = mapper.Map<Account>(addNewAccountDTO);
            accountModel.Banned = false; // Default Not Banned... duh
            accountModel.Role = "staff"; //Set Role fixed as staff
            accountModel.Password = passwordHasher.HashPassword(accountModel, addNewAccountDTO.Password); // Hashing the password sent back from FE
            accountModel = await accountRepository.AddNewAccount(accountModel);
            // Turn Model to DTO for returning a response
            var accountDto = mapper.Map<AccountDTO>(accountModel);
            return CreatedAtAction(nameof(GetAccountById), new { accountId = accountModel.AccountId }, accountDto);
        }
        [HttpPost]
        [Route("AddDeliveryStaff")]
        public async Task<IActionResult> AddNewDeliverySatffAccount([FromBody] AddNewAccountDTO addNewAccountDTO)
        {
            // Turn Data to Model With AutoMApper.ReverseMap
            var accountModel = mapper.Map<Account>(addNewAccountDTO);
            accountModel.Banned = false; // Default Not Banned... duh
            accountModel.Role = "delivery"; //Set Role fixed as deliverystaff
            accountModel.Password = passwordHasher.HashPassword(accountModel, addNewAccountDTO.Password); // Hashing the password sent back from FE
            accountModel = await accountRepository.AddNewAccount(accountModel);
            // Turn Model to DTO for returning a response
            var accountDto = mapper.Map<AccountDTO>(accountModel);
            return CreatedAtAction(nameof(GetAccountById), new { accountId = accountModel.AccountId }, accountDto);
        }

        [HttpGet]
        [Route("{accountId}")]
        public async Task<IActionResult> GetAccountById([FromRoute] int accountId)
        {
            var accountModel = await accountRepository.GetAccountById(accountId);
            if (accountModel == null)
            {
                return NotFound();
            }
            else
            {
                // AutoMapper from Model to DTO
                var accountDto = mapper.Map<AccountDTO>(accountModel);
                return Ok(accountDto);
            }

        }
        [HttpPut]
        [Route("{accountId}")]
        public async Task<IActionResult> UpdateAccountById([FromRoute] int accountId, [FromBody] UpdateAccountDTO updateAccountDTO)
        {
            // Map DTO to AccountModel
            var accountModel = mapper.Map<Account>(updateAccountDTO);
            accountModel = await accountRepository.UpdateAccount(accountId, accountModel);
            if (accountModel == null)
            {
                return NotFound();
            }
            else
            {
                var accountDto = mapper.Map<AccountDTO>(accountModel);
                return Ok(accountDto);
            }
        }
        [HttpDelete]
        [Route("{accountId}")]
        public async Task<IActionResult> DeleteAccountById([FromRoute] int accountId)
        {
            var accountModel = await accountRepository.DeleteAccount(accountId);
            if (accountModel == null)
            {
                return NotFound();
            }
            else
            {
                var accountDto = mapper.Map<AccountDTO>(accountModel);
                return Ok(accountDto);
            }
        }
    }
}
