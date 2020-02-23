using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CleanFix.Context;
using CleanFix.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CleanFix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {

            var projectList = new List<Project>();
            using (var db = new ApplicationContext())
            {
                var projects = db.Projects.ToList();

                foreach (var pr in projects)
                {
                    List<User> spons = new List<User>();
                    List<User> vols = null;
                    using (var db2 = new ApplicationContext())
                    {
                        var ps = db2.ProjectSponsors.Where(x => x.ProjectId == pr.Id).ToList();
                        if (ps != null)
                        {
                            foreach (var s in ps)
                            {
                                using (var db3 = new ApplicationContext())
                                {

                                    spons.Add(new Models.User()
                                    {
                                        Id = 1,
                                        Email = "lu.zin.kpi@gmail.com",
                                        CompanyName = "TestCompany",
                                        Name = "Vova",
                                        Donate = 5000
                                    });

                                    //var spn = db3.Users.FirstOrDefault(x => x.Id == 1);
                                    //if (spn != null)
                                    //{
                                    //    spons.Add(spn);
                                    //}
                                }
                            }

                        }
                    }
                    //using (var db3 = new ApplicationContext())
                    //{
                    //    vols = db3.Users.Join(db3.ProjectVolunteers, project => project.Id, ps => ps.UserId, (project, ps) => new { Project = project, Ps = ps })
                    //    .Where(x => x.Ps.ProjectId == pr.Id).Select(s => s.Project).ToList();
                    //}
                    projectList.Add(new Project()
                    {
                        Id = pr.Id,
                        Budget = pr.Budget,
                        Category = pr.Category,
                        Decription = pr.Decription,
                        District = pr.District,
                        Latitude = pr.Latitude,
                        Location = pr.Location,
                        Longitude = pr.Longitude,
                        MainPhoto = pr.MainPhoto,
                        Name = pr.Name,
                        Status = pr.Status,
                        TotalDonate = pr.TotalDonate,
                        TotalVolunteers = pr.TotalVolunteers,
                        Sponsors = spons,
                        //Volunteers = vols
                    });
                }
                return new JsonResult(projectList);
            }

        }

        [Route("{id}")]
        [HttpGet]
        public ActionResult Get(int id)
        {
            List<User> spons = new List<User>();
            using (var db = new ApplicationContext())
            {
                var pr = db.Projects.FirstOrDefault(x => x.Id == id);

                var ps = db.ProjectSponsors.Where(x => x.ProjectId == id).ToList();
                if (ps != null)
                {
                    foreach (var s in ps)
                    {
                        using (var db3 = new ApplicationContext())
                        {

                            spons.Add(new Models.User()
                            {
                                Id = 1,
                                Email = "lu.zin.kpi@gmail.com",
                                CompanyName = "TestCompany",
                                Name = "Vova",
                                Donate = 5000
                            });

                            //var spn = db3.Users.FirstOrDefault(x => x.Id == 1);
                            //if (spn != null)
                            //{
                            //    spons.Add(spn);
                            //}
                        }
                    }

                }
                var project = new Project()
                {
                    Id = pr.Id,
                    Budget = pr.Budget,
                    Category = pr.Category,
                    Decription = pr.Decription,
                    District = pr.District,
                    Latitude = pr.Latitude,
                    Location = pr.Location,
                    Longitude = pr.Longitude,
                    MainPhoto = pr.MainPhoto,
                    Name = pr.Name,
                    Status = pr.Status,
                    TotalDonate = pr.TotalDonate,
                    TotalVolunteers = pr.TotalVolunteers,
                    Sponsors = spons,
                    //Volunteers = vols
                };
                return new JsonResult(project);
            }

        }

        [HttpPost]
        public ActionResult Post([FromBody]Project project)
        {
            using (var db = new ApplicationContext())
            {
                var pr = db.Projects;
                pr.Add(project);
                db.SaveChanges();
            }

            return Ok();
        }
    }
}