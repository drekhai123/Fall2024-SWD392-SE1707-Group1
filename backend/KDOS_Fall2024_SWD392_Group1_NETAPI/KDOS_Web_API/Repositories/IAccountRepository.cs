using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
	// The interface is for all the action to work with in a API
	public interface IAccountRepository
	{
		Task<List<Account>> GetAllAccountAsync();
		Task<Account?>GetAccountById(int Id);
		Task<Account> AddNewAccount(Account account);
		Task<Account?> DeleteAccount(int id);
		Task<Account?> UpdateAccount(int id, Account account);
	}
}

