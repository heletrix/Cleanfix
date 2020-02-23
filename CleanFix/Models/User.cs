namespace CleanFix.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } // required only for person
        public string LastName { get; set; }  // required only for person
        public string MiddleName { get; set; } // required only for person
        public string Type { get; set; } // 0 - person, 1 - company
        public string Email { get; set; }
        public string PhoneNumber { get; set; } // optional
        public string CompanyName { get; set; } // optional
        public decimal? Donate { get; set; }
        public string Password { get; set; }
    }
}
