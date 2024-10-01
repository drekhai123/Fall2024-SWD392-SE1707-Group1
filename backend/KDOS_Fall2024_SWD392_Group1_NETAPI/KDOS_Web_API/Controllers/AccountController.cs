using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models;
using KDOS_Web_API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly KDOSDbContext accountContext;

        public AccountController(KDOSDbContext accountContext)
        {
            this.accountContext = accountContext;
        }
        [HttpGet]
        public IActionResult GetALlAcount()
        {
            var accountList = accountContext.Account.ToList();
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
        public IActionResult AddNewAccount([FromBody]AddNewAccountDTO addNewAccountDTO)
        {
            // Turn Data to Model
            var accountModel = new Account
            {
                UserName = addNewAccountDTO.UserName,
                Email = addNewAccountDTO.Email,
                Password = addNewAccountDTO.Password,
                Banned = addNewAccountDTO.Banned,
                Role = addNewAccountDTO.Role
            };
            accountContext.Account.Add(accountModel);
            accountContext.SaveChanges();
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
        public IActionResult GetAccountById([FromRoute] int accountId)
        {
            var accountModel = accountContext.Account.FirstOrDefault(x => x.AccountId == accountId);
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
        public IActionResult UpdateAccountById([FromRoute] int accountId, [FromBody] UpdateAccountDTO updateAccountDTO)
        {
            var accountModel = accountContext.Account.FirstOrDefault(x => x.AccountId == accountId);
            if (accountModel == null)
            {
                return NotFound();
            }
            else
            {
                  accountModel.UserName = updateAccountDTO.UserName;
                  accountModel.Email = updateAccountDTO.Email;
                  accountModel.Password = updateAccountDTO.Password;
                  accountModel.Banned = updateAccountDTO.Banned;
                  accountModel.Role = updateAccountDTO.Role;
                accountContext.SaveChanges();
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
        public IActionResult DeleteAccountById([FromRoute] int accountId)
        {
            var accountModel = accountContext.Account.FirstOrDefault(x => x.AccountId == accountId);
            if (accountModel == null)
            {
                return NotFound();
            }
            else
            {
                accountContext.Account.Remove(accountModel);
                accountContext.SaveChanges();
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

