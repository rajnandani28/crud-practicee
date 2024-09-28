using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;

namespace EmployeeDetails.EF.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext() : base("name=EmployeeContext")
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
