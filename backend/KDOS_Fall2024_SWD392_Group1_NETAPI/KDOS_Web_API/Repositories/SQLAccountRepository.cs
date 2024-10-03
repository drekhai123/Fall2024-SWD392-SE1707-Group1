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
    }
}

