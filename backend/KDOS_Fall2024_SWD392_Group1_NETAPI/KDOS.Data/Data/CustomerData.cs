using System;
using KDOS.Data.Models;

namespace KDOS.Data.Data
{
	public class CustomerData
	{
		public CustomerData()
		{
		}
		public List<Customer> GetAllData()
		{
            var customerList = new List<Customer>
            { new Customer
                {
                    CustomerId = Guid.NewGuid(),
                    CustomerName = "Hakurei Reimu",
                    Addresses= new string[]{"Hakurei Shrine, Gensokyo"},
                    Age=19,
                    Email="hakureimoney@gensokyo.com",


                },
                new Customer
                {
                    CustomerId = Guid.NewGuid(),
                    CustomerName = "Sakuya Izayoi",
                    Addresses= new string[]{"S.D.M, Gensokyo"},
                    Age=23,
                    Email="inusakuya@gensokyo.com",
                }
            };
            return customerList;
        }
	}
}

