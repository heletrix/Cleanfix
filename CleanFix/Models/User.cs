using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CleanFix.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; } // required only for person
        public string LastName { get; set; }  // required only for person
        public string MiddleName { get; set; } // required only for person
        public int Type { get; set; } // 0 - person, 1 - company
        [Required]
        public string Email { get; set; }
        public string PhoneNumber { get; set; } // optional
        public string CompanyName { get; set; } // optional
        public decimal? Donate { get; set; }
        public string Password { get; set; }
    }
}
