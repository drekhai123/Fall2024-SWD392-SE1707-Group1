using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Principal;
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
    public class AccountController : ControllerBase
    {
        private readonly KDOSDbContext accountContext;
        private readonly IAccountRepository accountRepository;
        private readonly IMapper mapper;

        // Adding in the Repository Inject
        // Adding AutoMApper Service
        public AccountController(KDOSDbContext accountContext, IAccountRepository accountRepository, IMapper mapper)
        {
            this.accountContext = accountContext;
            this.accountRepository = accountRepository;
            this.mapper = mapper;
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
          
            if(accountModel != null && accountModel.Password.Equals(loginDTO.Password))
            {
                AccountDTO accountDTO = mapper.Map<AccountDTO>(accountModel);
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
            // Turn Data to Model With AutoMApper.ReverseMap
            var accountModel = mapper.Map<Account>(addNewAccountDTO);
            accountModel = await accountRepository.AddNewAccount(accountModel);
            // Turn Model to DTO for returning a response
            var accountDto = mapper.Map<AccountDTO>(accountModel);
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

