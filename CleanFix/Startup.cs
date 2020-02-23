using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CleanFix.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CleanFix
{
	public class Startup
	{
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			//services.AddDbContext<ApplicationContext>(options => options.UseNpgsql(Configuration["ConnectionStrings:DefaultConnection"]));
			services.AddMvc(option => option.EnableEndpointRouting = false);

			services.AddCors(options =>
			{
				options.AddPolicy(MyAllowSpecificOrigins,
					builder => builder.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader());
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			app.Use(async (context, next) => {
				await next();
				if (context.Response.StatusCode == 404 &&
				   !Path.HasExtension(context.Request.Path.Value) &&
				   !context.Request.Path.Value.StartsWith("/api/")) {
					context.Request.Path = "/index.html";
					await next();
				}
			});

			app.UseCors(MyAllowSpecificOrigins);

			app.UseMvcWithDefaultRoute();

			app.UseDefaultFiles();
			app.UseStaticFiles();
		}
	}
}
