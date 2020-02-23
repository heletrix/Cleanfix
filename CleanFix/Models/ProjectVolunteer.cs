﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CleanFix.Models
{
    public class ProjectVolunteer
    {
        [Key]
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public int UserId { get; set; }
    }
}
