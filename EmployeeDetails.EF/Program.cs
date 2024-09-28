using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDetails.EF
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public int IsActive { get; set; }
    }

    public class EmployeeContext : DbContext
    {
        // No options passed in EF6
        public EmployeeContext() : base("name=EmployeeContext")
        {

            Database.SetInitializer(new CreateDatabaseIfNotExists<EmployeeContext>());

        }

        public DbSet<Employee> Employees { get; set; }
    }
    public class Program
    {
        static void Main(string[] args)
        {
            using (var context = new EmployeeContext())
            {
                // Interact with the context to ensure the database is created
                var employeeList = context.Employees.ToList(); // This will trigger database creation if it doesn't exist

                Console.WriteLine("Employee database has been created");
            }
            Console.ReadKey();  
        }
    }
}
