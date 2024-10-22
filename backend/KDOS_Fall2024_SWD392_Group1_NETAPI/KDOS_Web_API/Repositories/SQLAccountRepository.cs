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
            return await accountContext.Account.Include(x=>x.Customer).FirstOrDefaultAsync(x => x.AccountId == id);
        }

        public async Task<Account?> AddNewAccount(Account account)
        {
            var accountList = await accountContext.Account.ToListAsync();
            foreach (Account accountModel in accountList)
            {
                if (accountModel.Email.Equals(account.Email) || accountModel.UserName.Equals(account.UserName))
                {
                    return null;
                }
            }
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
                await accountContext.SaveChangesAsync();
                return accountExist;
            }
        }

       public async Task<Account?> Login(string userNameOrEmail)
        {
            return await accountContext.Account.Include(x=>x.Customer).FirstOrDefaultAsync(x => x.UserName == userNameOrEmail || x.Email == userNameOrEmail);
        }

        public async Task<Account?> BanAccount(int id, Account account)
        {
            var accountExist = await accountContext.Account.FirstOrDefaultAsync(x => x.AccountId == id);
            if (accountExist == null || !accountExist.Role.Equals("customer"))
            {
                return null;
            }
            else
            {
                accountExist.Banned = account.Banned;
                await accountContext.SaveChangesAsync();
                return account;
            }
        }
    }
}

