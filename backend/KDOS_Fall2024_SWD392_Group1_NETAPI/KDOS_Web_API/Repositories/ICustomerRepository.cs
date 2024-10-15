using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    // The interface is for all the action to work with in a API
    public interface ICustomerRepository
	{
		Task<List<Customer>> GetAllCustomer();
		Task<Customer?> GetCustomerById(int id);
		Task<Customer?> AddNewCustomer(Customer customer);
		Task<Customer?> UpdateCustomer(int id, Customer customer);
		Task<Customer?> DeleteCustomer(int id);
        Task<List<Customer>> GetCustomerByName(String name);
		Task<Account?> GetAccountByCustomer(int id);

    }
}

