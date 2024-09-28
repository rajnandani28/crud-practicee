using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDetails.EF.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public int IsActive { get; set; }
    }
}
