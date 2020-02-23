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
        public ActionResult Add([FromBody]User user)
        {
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                return NotFound();
            }
            using (var db = new ApplicationContext())
            {
                try
                {
                    if (db.Users.FirstOrDefault(x => x.Email.Equals(user.Email)) == null)
                    {
                        db.Users.Add(user);
                        db.SaveChanges();
                        var createdUserId = db.Users.FirstOrDefault(x => x.Email.Equals(user.Email));
                        return createdUserId == null ? (ActionResult)NotFound() : Ok(createdUserId.Id);
                    }
                    return StatusCode(409, $"User with email {user.Email} already exists.");
                }
                catch (Exception e)
                {
                    return StatusCode(500, "Internal server error " + e);
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
                var user = db.Users.FirstOrDefault(x => x.Email.Equals(email));
                return user == null ? StatusCode(404, $"User with email {user.Email} not found.") : Ok(user);
            }
        }
    }
}
