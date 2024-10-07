using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
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
    public class AccountController : ControllerBase
    {
        private readonly KDOSDbContext accountContext;
        private readonly IAccountRepository accountRepository;

        // Adding in the Repository Inject
        public AccountController(KDOSDbContext accountContext, IAccountRepository accountRepository)
        {
            this.accountContext = accountContext;
            this.accountRepository = accountRepository;
        }
        [HttpGet]
        // Async Task!!! Async Task(IActionResult) -> Await... tolistAsync
        public async Task<IActionResult> GetALlAcount()
        {
            // Now we don't call the DB directly but through the Depository
            // var accountList = await accountContext.Account.ToListAsync();
            var accountList = await accountRepository.GetAllAccountAsync();
            var accountDto = new List<AccountDTO>();
            foreach(Account account in accountList)
            {
                accountDto.Add(new AccountDTO()
                {
                    AccountId = account.AccountId,
                    UserName = account.UserName,
                    Email = account.Email,
                    Password = account.Password,
                    Banned = account.Banned,
                    Role = account.Role
                    
                }); 
            }
            return Ok(accountDto);
        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var accountModel = await accountRepository.Login(loginDTO.UserNameOrEmail); // Check account by email or username
          
            if(accountModel != null && accountModel.Password.Equals(loginDTO.Password))
            {
                AccountDTO accountDTO = new AccountDTO
                {
                    Email = accountModel.Email,
                    Role = accountModel.Role,
                    UserName = accountModel.UserName,
                    Banned = accountModel.Banned,
                    Password = accountModel.Password
                };
                return Ok(accountDTO);
            }
            else
            {
                return NotFound("Error! Wrong Email/UserName or Password");
            }

        }

        [HttpPost]
        public async Task<IActionResult> AddNewAccount([FromBody]AddNewAccountDTO addNewAccountDTO)
        {
            // Turn Data to Model
            var accountModel = new Account
            {
                UserName = addNewAccountDTO.UserName,
                Email = addNewAccountDTO.Email,
                Password = addNewAccountDTO.Password,
                Banned = false,
                Role = addNewAccountDTO.Role
            };
            accountModel = await accountRepository.AddNewAccount(accountModel);
            // Turn Model to DTO for returning a response
            var accountDto = new AccountDTO
            {
                AccountId = accountModel.AccountId,
                UserName = accountModel.UserName,
                Email = accountModel.Email,
                Password = accountModel.Password,
                Banned = accountModel.Banned,
                Role = accountModel.Role
            };
            return CreatedAtAction(nameof(GetAccountById),new { accountId = accountModel.AccountId}, accountDto);
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
                var accountDto = new AccountDTO
                {
                    AccountId = accountModel.AccountId,
                    UserName = accountModel.UserName,
                    Email = accountModel.Email,
                    Password = accountModel.Password,
                    Banned = accountModel.Banned,
                    Role = accountModel.Role
                };
                return Ok(accountDto);
            }
            
        }
        [HttpPut]
        [Route("{accountId}")]
        public async Task<IActionResult> UpdateAccountById([FromRoute] int accountId, [FromBody] UpdateAccountDTO updateAccountDTO)
            {
            // Map DTO to AccountModel
            var accountModel = new Account
            {
            UserName = updateAccountDTO.UserName,
            Email = updateAccountDTO.Email,
            Password = updateAccountDTO.Password,
            Banned = updateAccountDTO.Banned,
            Role = updateAccountDTO.Role,
        };
            accountModel = await accountRepository.UpdateAccount(accountId, accountModel);
            if (accountModel == null)
            {
                return NotFound();
            }
            else
            {
                 var accountDto = new AccountDTO
                {
                    AccountId = accountModel.AccountId,
                    UserName = accountModel.UserName,
                    Email = accountModel.Email,
                    Password = accountModel.Password,
                    Banned = accountModel.Banned,
                    Role = accountModel.Role
                };
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
                var accountDto = new AccountDTO
                {
                    AccountId = accountModel.AccountId,
                    UserName = accountModel.UserName,
                    Email = accountModel.Email,
                    Password = accountModel.Password,
                    Banned = accountModel.Banned,
                    Role = accountModel.Role
                };
                return Ok(accountDto);
            }
        }
    }
    
}

