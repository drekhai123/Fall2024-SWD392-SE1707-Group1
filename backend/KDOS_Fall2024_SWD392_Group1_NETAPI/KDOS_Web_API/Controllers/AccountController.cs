using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using KDOS_Web_API.Services.MailingService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity; // PasswordHasher<Account>
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

//Implimenting Password Hashing

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IAccountRepository accountRepository;
        private readonly IMapper mapper;
        private readonly IPasswordHasher<Account> passwordHasher;
        private readonly IMailingService mailingService;

        // Adding in the Repository Inject
        // Adding AutoMApper Service
        public AccountController(IAccountRepository accountRepository, IMapper mapper, IPasswordHasher<Account> passwordHasher, IMailingService mailingService, IConfiguration configuration)
        {
            this.accountRepository = accountRepository;
            this.mapper = mapper;
            this.passwordHasher = passwordHasher;
            this.mailingService = mailingService;
            this.configuration = configuration;
        }
        [Authorize]
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
            if (loginDTO == null)
            {
                return BadRequest("Invalid login request.");
            }

            var accountModel = await accountRepository.Login(loginDTO.UserNameOrEmail); // Check account by email or username

            if (accountModel == null)
            {
                return Unauthorized("Error! Wrong Email/UserName or Password");
            }

            // Check if the account is banned
            if (accountModel.Banned)
            {
                return BadRequest("Your account has been banned. Please contact support.");
            }

            var verifyPassword = passwordHasher.VerifyHashedPassword(accountModel, accountModel.Password, loginDTO.Password); // Validate the hashed password
            if (verifyPassword == PasswordVerificationResult.Success) // Password is correct
            {
                AccountDTO accountDTO = mapper.Map<AccountDTO>(accountModel);
                var token = IssueToken(accountModel); // Generate a JWT token
                return Ok(new { account = accountDTO, token = token });
            }

            return Unauthorized("Error! Wrong Email/UserName or Password");
        }
        [HttpPost]
        [Route("GoogleLogin")]
        public async Task<IActionResult> GoogleLogin([FromBody] LoginDTO loginDTO)
        {
            var accountModel = await accountRepository.Login(loginDTO.UserNameOrEmail); // Check account by email or username

            if (accountModel == null)
            {
                return NotFound("Error! Wrong Email Or Account Doesn't Exist");
            }

            // Check if the account is banned
            if (accountModel.Banned)
            {
                return BadRequest("Your account has been banned. Please contact support.");
            }

            // If account exists and is not banned, proceed to generate token
            AccountDTO accountDTO = mapper.Map<AccountDTO>(accountModel);
            var token = IssueToken(accountModel); // Generate a JWT token
            return Ok(new { account = accountDTO, token = token });

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
            return CreatedAtAction(nameof(GetAccountById), new { accountId = accountModel.AccountId }, accountDto);
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
            accountModel = await accountRepository.VerificationMailing(accountModel, verificationModel);
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
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> AddNewVerifyPassword([FromBody] AccountResetPasswordDTO accountResetPasswordDTO)
        {
            var accountModel = mapper.Map<Account>(accountResetPasswordDTO);
            accountModel = await accountRepository.Login(accountModel.Email);
            if (accountModel == null)
            {
                return NotFound("Account Not Exist");
            }

            var verificationLink = Url.Action("PasswordVerification", "Account", new { password = accountResetPasswordDTO.Password, accountId = accountModel.AccountId }, Request.Scheme);
            if (verificationLink == null)
            {
                return NotFound("Can't Generate A Verification Link");
            }
            var response = await mailingService.SendResetPassword(accountModel, verificationLink);
            return Ok(response);
        }
        [HttpGet]
        [Route("PasswordVerification")]
        public async Task<IActionResult> PasswordVerification([FromQuery] string password, string accountId)
        {
            var accountModel = await accountRepository.GetAccountById(int.Parse(accountId));

            if (accountModel == null)
            {
                return NotFound("No Account are stored");
            }
            else
            {
                accountModel.Password = passwordHasher.HashPassword(accountModel, password); // Hashing the password sent back
                accountModel = await accountRepository.UpdatePassword(accountModel.AccountId, accountModel);
                if (accountModel==null)
                {
                    return BadRequest("Cannot Change Password");
                }
                else
                {
                    string redirectUrl = "https://kdos.vercel.app/login";
                    return Redirect(redirectUrl);
                }
            }
        }
        [HttpGet]
        [Route("Verification")]
        public async Task<IActionResult> Verification([FromQuery] string accountId, string token)
        {
            var accountModel = await accountRepository.GetAccountById(int.Parse(accountId));
            var verificationModel = await accountRepository.FindVerificationWithAccountId(int.Parse(accountId));
            if (accountModel == null || verificationModel == null)
            {
                return NotFound("No Account or No Verification are stored");
            }
            else if (accountModel.Verified == true)
            {
                return NotFound("Account Is Already Verified!");
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
                        var response = await mailingService.SendRegisterMail(accountModel);
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
            accountModel.Verified = true; //Set Role fixed as staff
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
            accountModel.Verified = true; //Set Role fixed as staff
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
        [Authorize]
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
        [HttpPut]
        [Authorize]
        [Route("avatar/{accountId}")]
        public async Task<IActionResult> UpdateAccountAvatar([FromRoute] int accountId, [FromBody] UpdateAccountAvatarDTO updateAccountAvatarDTO)
        {
            // Map DTO to AccountModel
            var accountModel = mapper.Map<Account>(updateAccountAvatarDTO);
            accountModel = await accountRepository.UpdateAvatar(accountId, accountModel);
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

        [HttpPatch("UpdateRole/{accountId}")]
        public async Task<IActionResult> UpdateRole(int accountId, [FromBody] UpdateOnlyRoleDTO role)
        {
            // Map DTO to AccountModel for role update
            var accountModel = mapper.Map<Account>(role);

            var updatedAccount = await accountRepository.UpdateRole(accountId, accountModel);

            if (updatedAccount == null)
            {
                return NotFound(new { Message = "User not found" });
            }
            else
            {
                var accountDto = mapper.Map<AccountDTO>(updatedAccount);
                return Ok(accountDto);
            }
        }

        [HttpGet]
        [Route("Existed/{accountId}")]
        public async Task<IActionResult> CheckAccountExisted([FromRoute] int accountId)
        {
            var accountModel = await accountRepository.GetAccountById(accountId);
            if (accountModel == null)
            {
                return NotFound();
            }
            else
            {
                return Ok();
            }
        }   



        [HttpPatch("ToggleBanned/{accountId}")]
        public async Task<IActionResult> ToggleBanned(int accountId)
        {
            var success = await accountRepository.ToggleBannedStatusAsync(accountId);

            if (!success)
            {
                return NotFound(new { Message = "User not found" });
            }

            return Ok(new { Message = "Banned status toggled successfully" });
        }

        

        [HttpDelete]
        [Authorize]
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


        // Private method to generate a JWT token using the user's data.
        private string IssueToken(Account account)
        {
            // Creates a new symmetric security key from the JWT key specified in the app configuration.
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            // Sets up the signing credentials using the above security key and specifying the HMAC SHA256 algorithm.
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            // Defines a set of claims to be included in the token.
            var claims = new List<Claim>
            {
                // Custom claim using the user's ID.
                new Claim("Myapp_User_Id", account.AccountId.ToString()),
                // Standard claim for user identifier, using username.
                new Claim(ClaimTypes.NameIdentifier, account.UserName),
                // Standard claim for user's email.
                new Claim(ClaimTypes.Email, account.Email),
                // Standard JWT claim for subject, using user ID.
                new Claim(JwtRegisteredClaimNames.Sub, account.AccountId.ToString())
            };
            // Adds a role claim for each role associated with the user.

            //account.Roles.ForEach(role => claims.Add(new Claim(ClaimTypes.Role, role)));

            // Creates a new JWT token with specified parameters including issuer, audience, claims, expiration time, and signing credentials.
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1), // Token expiration set to 1 hour from the current time.
                signingCredentials: credentials);
            // Serializes the JWT token to a string and returns it.
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}

