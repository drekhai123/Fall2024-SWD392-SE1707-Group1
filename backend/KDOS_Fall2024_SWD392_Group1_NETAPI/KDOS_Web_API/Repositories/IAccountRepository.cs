using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
	// The terface is for all the action to work with in a API
	public interface IAccountRepository
	{
		Task<List<Account>> GetAllAccountAsync();
	}
}

