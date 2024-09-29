using KDOS_Web_API.Models;

namespace KDOS_Web_API.Datas
{
    public class CustomerData
    {
        List<Customer> customerList = new List<Customer>
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
        public List<Customer> GetAllData()
        {
            return customerList;
        }
        public Customer GetCustomerById(Guid id)
        {
            Customer? foundCustomer = null;
            foreach (Customer customer in customerList)
            {
                if (customer.CustomerId.Equals(id))
                {
                    foundCustomer = customer;
                }
            }
            return foundCustomer!; //Possible Null value !
        }
        public Customer GetCustomerByName(String name)
        {
            Customer? foundCustomer = null;
            foreach (Customer customer in customerList)
            {
                if (customer.CustomerName.Equals(name))
                {
                    foundCustomer = customer;
                }
            }
            return foundCustomer!; //Possible Null value !
        }
    }
}
