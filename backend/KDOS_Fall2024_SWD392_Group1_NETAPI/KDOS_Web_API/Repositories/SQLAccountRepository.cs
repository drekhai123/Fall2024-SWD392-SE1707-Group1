using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
    // The impliment class - just like the cotroller
    public class SQLAccountRepository : IAccountRepository
    {
        private readonly KDOSDbContext accountContext;

        public SQLAccountRepository(KDOSDbContext accountContext)
        {
            this.accountContext = accountContext;
        }
        // The job of the reposiory is to access the Datebase, not the controller
        public async Task<List<Account>> GetAllAccountAsync()
        {
            return await accountContext.Account.ToListAsync();
        }
        public async Task<Account?> GetAccountById(int id)
        {
            return await accountContext.Account.FirstOrDefaultAsync(x => x.AccountId == id);
        }

        public async Task<Account> AddNewAccount(Account account)
        {
            await accountContext.Account.AddAsync(account);
            await accountContext.SaveChangesAsync();
            return account;
        }

        public async Task<Account?> DeleteAccount(int id)
        {
           var accountExist = await accountContext.Account.FirstOrDefaultAsync(x => x.AccountId == id);
            if (accountExist == null)
            {
                return null;
            }
            else
            {
                accountContext.Account.Remove(accountExist);
                await accountContext.SaveChangesAsync();
                return accountExist;
            }
           
        }

        public async Task<Account?> UpdateAccount(int id, Account account)
        {
            var accountExist = await accountContext.Account.FirstOrDefaultAsync(x => x.AccountId == id);
            if(accountExist == null)
            {
                return null;
            }
            else
            {
                accountExist.UserName = account.UserName;
                accountExist.Email = account.Email;
                accountExist.Password = account.Password;
                accountExist.Banned = account.Banned;
                accountExist.Role = account.Role;
                await accountContext.SaveChangesAsync();
                return account;
            }
            
        }
    }
}

