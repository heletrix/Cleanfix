using System;
using System.Linq;
using CleanFix.Context;
using CleanFix.Models;
using Microsoft.AspNetCore.Mvc;

namespace CleanFix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost]
        public ActionResult Add(User user)
        {
            using (var db = new ApplicationContext())
            {
                try
                {
                    db.Users.Add(user);
                    db.SaveChanges();
                    var createdUserId = db.Users.FirstOrDefault(x => x.Email.Equals(user.Email));
                    return createdUserId == null ? (ActionResult)NotFound() : Ok(createdUserId.Id);
                }
                catch (Exception e)
                {
                    return StatusCode(500, "Internal server error");
                }
            }
        }

        [Route("{email}")]
        [HttpGet]
        public ActionResult Get(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return NotFound();
            }
            using (var db = new ApplicationContext())
            {
                var user = db.Users?.FirstOrDefault(x => x.Email.Equals(email));
                return user == null ? (ActionResult) NotFound() : Ok(user);
            }
        }
    }
}
