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
            var emailorUsernameExist = await accountContext.Account.FirstOrDefaultAsync(x => x.Email == account.Email|| x.UserName == account.UserName);
            if (accountExist == null || !accountExist.Equals(emailorUsernameExist))
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

        public async Task<Account?> VerificationAccount(Account account, Verification verification)
        {
            var verificationModel = await accountContext.Verification.FirstOrDefaultAsync(x=>x.AccountId== account.AccountId);
            if (verificationModel==null||verificationModel.ExpiredDate < verification.ExpiredDate)
            {
                return null;
            }
            accountContext.Verification.Remove(verification);
            var accountExist = await accountContext.Account.FirstOrDefaultAsync(x => x.AccountId == account.AccountId);
            // Account is guarantee in DB
            accountExist!.Verified = account.Verified; 
            await accountContext.SaveChangesAsync();
            return accountExist;
        }

        public async Task<Account?> VerificationMailing(Account account, Verification verification)
        {
            // Incase of re-verification, delete the old verification
            var verificationExist = await accountContext.Verification.FirstOrDefaultAsync(x => x.AccountId == verification.AccountId);
            if (verificationExist!=null)
            {
                accountContext.Verification.Remove(verificationExist);
                await accountContext.SaveChangesAsync();
            }
            // Add a new verification
            await accountContext.Verification.AddAsync(verification);
            await accountContext.SaveChangesAsync();
            return account;
        }

        public async Task<Verification?> FindVerificationWithAccountId(int id)
        {
            var verificationExist = await accountContext.Verification.FirstOrDefaultAsync(x => x.AccountId == id);
            if (verificationExist == null)
            {
                return null;
            }
            else
            {
                return verificationExist;
            }
        }
    }
}

