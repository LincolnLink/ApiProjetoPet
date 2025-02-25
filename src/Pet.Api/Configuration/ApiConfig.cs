﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Pet.Api.Extensions;

namespace Pet.Api.Configuration
{
    public static class ApiConfig
    {
        public static IServiceCollection AddApiConfig(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddApiVersioning(options =>
            {
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.ReportApiVersions = true;
            });

            services.AddVersionedApiExplorer(options =>
            {
                options.GroupNameFormat = "'v'VVV";
                options.SubstituteApiVersionInUrl = true;
            });

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddCors(options =>
            {
                options.AddPolicy("Development", builder =>
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader());

                options.AddPolicy("Local", builder =>
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader());

                options.AddPolicy("Production", builder =>
                    builder.WithMethods("GET")
                           .WithOrigins("http://desenvolvedor.io")
                           .SetIsOriginAllowedToAllowWildcardSubdomains()
                           .AllowAnyHeader());
            });

            return services;
        }

        public static IApplicationBuilder UseApiConfig(this IApplicationBuilder app)
        {
            var env = app.ApplicationServices.GetRequiredService<IWebHostEnvironment>();

            if (env.IsDevelopment())
            {
                app.UseCors("Development");
            }
            if (env.IsEnvironment("Local"))
            {
                app.UseCors("Local");
            }
            else
            {
                app.UseCors("Production");
            }

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => endpoints.MapControllers());

            return app;
        }

    }
}
