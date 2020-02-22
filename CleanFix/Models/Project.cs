﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CleanFix.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Decription { get; set; }

        public string Category { get; set; }

        public string MainPhoto { get; set; }

        public decimal Budget { get; set; }
        
        public bool Status { get; set; }

        public string District { get; set; }

        public string Location { get; set;  }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

    }
}
