﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CleanFix.Models
{
    public class Sponsor
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public decimal? Donate { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string CompanyName { get; set; }

        public string CompanyLogo { get; set; }

    }
}
