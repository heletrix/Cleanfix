using CleanFix.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CleanFix.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }

        public DbSet<Sponsor> Sponsors { get; set; }

        public DbSet<Volunteer> Volunteers { get; set; }


        public ApplicationContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=ec2-54-246-90-10.eu-west-1.compute.amazonaws.com;Port=5432;Database=d5uoraj48dtav1;Username=wwwrnjjrkfwrwk;Password=d4bdda56ce85d8e33f6c46b1341cb444a481218aa2c778289191b4810f990a7d;SslMode=Require;TrustServerCertificate=true;");
        }
    }
}
