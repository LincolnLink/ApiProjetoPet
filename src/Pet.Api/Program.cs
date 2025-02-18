
using Pet.Api.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Dev.Data.Context;

namespace Pet.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.WebHost.UseUrls("http://0.0.0.0:5000", "https://0.0.0.0:5001");

            var environment = builder.Environment.EnvironmentName;
            builder.Configuration
                .SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            if (builder.Environment.IsDevelopment())
            {
                builder.Configuration.AddUserSecrets<Program>();
            }

            if (builder.Environment.IsEnvironment("Local"))
            {
                builder.Configuration.AddUserSecrets<Program>();
            }

            // Configura serviços
            ConfigureServices(builder);

            var app = builder.Build();

            // Configura middlewares
            ConfigureMiddlewares(app);

            app.Run();
        }

        private static void ConfigureServices(WebApplicationBuilder builder)
        {
            var services = builder.Services;

            services.AddDbContext<MeuDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentityConfig(builder.Configuration);

            services.AddAutoMapper(typeof(Program));
            services.AddApiConfig();
            services.AddSwaggerConfig();            
            services.ResolveDependencies();
        }

        private static void ConfigureMiddlewares(WebApplication app)
        {
            var env = app.Environment;

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            if (env.IsEnvironment("Local"))
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseApiConfig();
            app.UseRouting();
            app.UseAuthorization();
            app.MapControllers();
        }
    }
}
