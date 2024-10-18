using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
    public class SQLCustomerRepository : ICustomerRepository
    {
        private readonly KDOSDbContext customerContext;

        public SQLCustomerRepository(KDOSDbContext customerContext)
        {
            this.customerContext = customerContext;
        }

        public async Task<Customer?> AddNewCustomer(Customer customer)
        {
            // add extra step to check customer status
            var accountExist = await customerContext.Account.FirstOrDefaultAsync(x => x.AccountId == customer.AccountId);
            if (accountExist == null || !accountExist.Role.Equals("customer"))
            {
                return null;
            }
            else
            {
                var customerExist = await customerContext.Customer.FirstOrDefaultAsync(x => x.AccountId == customer.AccountId);
                if (customerExist != null)
                {
                    return null;
                }
                else
                {
                    await customerContext.Customer.AddAsync(customer);
                    await customerContext.SaveChangesAsync();
                    return customer;
                }
            }
        }

        public async Task<Customer?> DeleteCustomer(int id)
        {
            var customerModel = await customerContext.Customer.FirstOrDefaultAsync(x => x.CustomerId == id);
            if (customerModel == null)
            {
                return null;
            }
            else
            {
                customerContext.Customer.Remove(customerModel);
                await customerContext.SaveChangesAsync();
                return customerModel;
            }

        }

        public async Task<List<Customer>> GetAllCustomer()
        {
            List<Customer> customerList = await customerContext.Customer.ToListAsync();
            return customerList;
        }

        public async Task<Customer?> GetCustomerById(int id)
        {
            var customerModel = await customerContext.Customer.FirstOrDefaultAsync(x => x.CustomerId == id);
            if(customerModel == null)
            {
                return null;
            }
            else
            {
                var accountModel = await customerContext.Account.FirstOrDefaultAsync(x => x.AccountId == customerModel.AccountId);
                return customerModel;
            }

        }
        public async Task<Account?> GetAccountByCustomer(int id)
        {
            var accountModel = await customerContext.Account.FirstOrDefaultAsync(x => x.AccountId == id);
            return accountModel;
        }

        public async Task<List<Customer>> GetCustomerByName(string name)
        {
            // Where query can return a list of data, unlike 1 data
            var customerModelList = await customerContext.Customer.Where(x => x.CustomerName.Contains(name)).ToListAsync();
            return customerModelList;
        }


        public async Task<Customer?> UpdateCustomer(int id, Customer customer)
        {
            var customerModel = await customerContext.Customer.FirstOrDefaultAsync(x => x.CustomerId == id);
            if (customerModel == null)
            {
                return null;
            }
            else
            {
                customerModel.CustomerName = customer.CustomerName;
                customerModel.Age = customer.Age;
                customerModel.Address = customer.Address;
                customerModel.Gender = customer.Gender;
                customerModel.PhoneNumber = customer.PhoneNumber;
                await customerContext.SaveChangesAsync();
                return customerModel;


            }
        }


    }
}

