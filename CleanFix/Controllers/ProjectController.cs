using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CleanFix.Context;
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
            using (var db = new ApplicationContext())
            {
                var projects = db.Projects.Join(db.ProjectSponsors, x => x.Id, p => p.ProjectId, (post, meta) => new { Post = post, Meta = meta }).ToList();
                return new JsonResult(projects);
            }
            
        }

        [Route("{id}")]
        [HttpGet]
        public ActionResult Get(int id)
        {
            using (var db = new ApplicationContext())
            {
                var projects = db.Projects.Where(x => x.Id == id).ToList();
                return new JsonResult(projects);
            }

        }
    }
}