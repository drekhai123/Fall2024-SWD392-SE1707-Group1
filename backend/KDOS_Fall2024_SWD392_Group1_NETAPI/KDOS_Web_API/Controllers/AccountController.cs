using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using KDOS_Web_API.Services.MailingService;
using Microsoft.AspNetCore.Identity; // PasswordHasher<Account>
using Microsoft.AspNetCore.Mvc;

//Implimenting Password Hashing

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository accountRepository;
        private readonly IMapper mapper;
        private readonly IPasswordHasher<Account> passwordHasher;
        private readonly IMailingService mailingService;

        // Adding in the Repository Inject
        // Adding AutoMApper Service
        public AccountController(IAccountRepository accountRepository, IMapper mapper, IPasswordHasher<Account> passwordHasher, IMailingService mailingService)
        {
            this.accountRepository = accountRepository;
            this.mapper = mapper;
            this.passwordHasher = passwordHasher;
            this.mailingService = mailingService;
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
           
            if(accountModel != null)
            {
                var verifyPassword = passwordHasher.VerifyHashedPassword(accountModel,accountModel.Password, loginDTO.Password); //Validate the hased password vs the password from FE, Return 1 if correct, 0 if failed
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
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            // Turn Data to Model With AutoMApper.ReverseMap
            var accountModel = mapper.Map<Account>(addNewAccountDTO);
            accountModel.Banned = false; // Default Not Banned... duh
            accountModel.Role = "customer"; //Set Role fixed as Customer
            accountModel.Password = passwordHasher.HashPassword(accountModel, addNewAccountDTO.Password); // Hashing the password sent back from FE
            accountModel.Verified = false;
            accountModel = await accountRepository.AddNewAccount(accountModel);
            // Turn Model to DTO for returning a response
            if (accountModel == null)
            {
                return BadRequest("Email or username already in use.");
            }
            var accountDto = mapper.Map<AccountDTO>(accountModel);
            return CreatedAtAction(nameof(GetAccountById),new { accountId = accountModel.AccountId}, accountDto);
        }
        [HttpPost]
        [Route("AddVerification/{accountId}")]
        public async Task<IActionResult> AddNewVerification([FromRoute] int accountId)
        {
            var accountModel = await accountRepository.GetAccountById(accountId);
            if (accountModel == null)
            {
                return NotFound("No Account Exist To Verified");
            }
            var token = Guid.NewGuid().ToString(); // Create a unique Token with GUID
            var verificationModel = new Verification
            {
                AccountId = accountId,
                Token = token,
                ExpiredDate = DateTime.Now.AddHours(1), // One hour to verify
            };
            accountModel=await accountRepository.VerificationMailing(accountModel, verificationModel);
            if (accountModel == null)
            {
                return NotFound("Can't Create a Verification Data");
            }
            // Url.Action generate a url to an API in a Controller
            //var verificationLink = Url.Action("API", "Controller",... , Request.Scheme);
            //Request.Scheme send a command to execute the API
            var verificationLink = Url.Action("Verification", "Account", new { accountId = accountModel.AccountId, token = verificationModel.Token }, Request.Scheme);
            if (verificationLink == null)
            {
                return NotFound("Can't Generate A Verification Link");
            }
            var response = await mailingService.SendVerificationLink(accountModel, verificationLink);
            return Ok(response);
        }
        [HttpGet]
        [Route("Verification")]
        public async Task<IActionResult> Verification([FromQuery] string accountId,string token)
        {
            var accountModel = await accountRepository.GetAccountById(int.Parse(accountId));
            var verificationModel = await accountRepository.FindVerificationWithAccountId(int.Parse(accountId));
            if(accountModel==null || verificationModel == null)
            {
                return NotFound("No account or No Verification are stored");
            }
            else
            {
                if (verificationModel.Token.Equals(token))
                {
                    accountModel.Verified = true;
                    verificationModel.ExpiredDate = DateTime.Now;
                    accountModel = await accountRepository.VerificationAccount(accountModel, verificationModel);
                    if (accountModel == null)
                    {
                        return BadRequest("Token Expired!");
                    }
                    else  // Account Verification Complete! Redirect To Login Page
                    {
                        string redirectUrl = "https://kdos.vercel.app/login";
                        return Redirect(redirectUrl);
                    }
                } 
                else
                {
                    return BadRequest("Wrong Token");
                }
            }
        }
        [HttpPost]
        [Route("AddStaff")]
        public async Task<IActionResult> AddNewStaffAccount([FromBody] AddNewAccountDTO addNewAccountDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            // Turn Data to Model With AutoMApper.ReverseMap
            var accountModel = mapper.Map<Account>(addNewAccountDTO);
            accountModel.Banned = false; // Default Not Banned... duh
            accountModel.Role = "staff"; //Set Role fixed as staff
            accountModel.Password = passwordHasher.HashPassword(accountModel, addNewAccountDTO.Password); // Hashing the password sent back from FE
            accountModel = await accountRepository.AddNewAccount(accountModel);
            if (accountModel == null)
            {
                return BadRequest("Email or username already in use.");
            }
            // Turn Model to DTO for returning a response
            var accountDto = mapper.Map<AccountDTO>(accountModel);
            return CreatedAtAction(nameof(GetAccountById), new { accountId = accountModel.AccountId }, accountDto);
        }
        [HttpPost]
        [Route("AddDeliveryStaff")]
        public async Task<IActionResult> AddNewDeliverySatffAccount([FromBody] AddNewAccountDTO addNewAccountDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            // Turn Data to Model With AutoMApper.ReverseMap
            var accountModel = mapper.Map<Account>(addNewAccountDTO);
            accountModel.Banned = false; // Default Not Banned... duh
            accountModel.Role = "delivery"; //Set Role fixed as deliverystaff
            accountModel.Password = passwordHasher.HashPassword(accountModel, addNewAccountDTO.Password); // Hashing the password sent back from FE
            accountModel = await accountRepository.AddNewAccount(accountModel);
            if (accountModel == null)
            {
                return BadRequest("Email or username already in use.");
            }
            // Turn Model to DTO for returning a response
            var accountDto = mapper.Map<AccountDTO>(accountModel);
            return CreatedAtAction(nameof(GetAccountById), new { accountId = accountModel.AccountId }, accountDto);
        }

        [HttpGet]
        [Route("{accountId}")]
        public async Task<IActionResult> GetAccountById([FromRoute] int accountId)
        {
            var accountModel = await accountRepository.GetAccountById(accountId);
            if(accountModel == null)
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
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
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
        [HttpPut]
        [Route("ban/{accountId}")]
        public async Task<IActionResult> BanAccount([FromRoute] int accountId, [FromBody] UpdateAccountStatus updateAccountStatus)
        {
            // Map DTO to AccountModel
            var accountModel = mapper.Map<Account>(updateAccountStatus);
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

