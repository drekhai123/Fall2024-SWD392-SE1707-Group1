using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Client class which is consuming the services provided by the EmployeeDAL Class
namespace DemoDependencyInjection
{
    //Client Class or Dependent Object
    //This is the Class that is going to consume the services provided by the EmployeeDAL Class
    //That means it is the Dependent Class which is Depending on the EmployeeDAL Class
    public class EmployeeBL
    {
        public EmployeeDAL employeeDAL;

        //Injecting the Dependency Object using Constructor means it is a Loose Coupling
        public EmployeeBL(EmployeeDAL employeeDAL)
        {
            this.employeeDAL = employeeDAL;
        }
        public List<Employee> GetAllEmployees()
        {
            //Creating an Instance of Dependency Class means it is a Tight Coupling
            employeeDAL = new EmployeeDAL();
            return employeeDAL.SelectAllEmployees();
        }
    }
}
