namespace Pet.Api.Configuration
{
    public static class ApiConfig
    {

        public static IApplicationBuilder UseApiConfig(this IApplicationBuilder app)
        {
            app.UseAuthentication();

            return app;
        }

    }
}
