# ApiProjetoPet

 - Comando que cria a imagem usando dockerfile e o docker-compose

 docker build -t apipet -f src/Pet.Api/Dockerfile .

 - Lista a imagem

 docker images

 - Comando que cria o container

 docker run -d -p 8080:8080 --name apipet-container apipet

 - Lista os comtainer

docker ps

 - lista os container mesmo parado 

docker ps -a

 - Inicia o container

docker start -a <nome-do-container>

 - comando para executar backend e frontend

# Comando para rodar o docker-compose

docker-compose up pet.frontend.dev
docker-compose up -d pet.api

# Comando do entityframework.

 - deve executar o comando com o docker-desktop fechado.

dotnet ef migrations add primeiroBuild --context MeuDbContext

dotnet ef database update

# deve se criar um classe chamada fabrica de contexto, alem do dbcontext. 

<blockquete>

        public class MeuDbContextFactory : IDesignTimeDbContextFactory<MeuDbContext>
        {
            public MeuDbContext CreateDbContext(string[] args)
            {
                var config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true)
                    .Build();

                var optionsBuilder = new DbContextOptionsBuilder<MeuDbContext>();
                optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));

                return new MeuDbContext(optionsBuilder.Options);
            }
        }


</blockquete>


 # Passando valor para variavel de ambiente e consultando o valor no powershell

$env:ASPNETCORE_ENVIRONMENT="Local"

$env:ASPNETCORE_ENVIRONMENT 



