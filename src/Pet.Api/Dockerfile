#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Pet.Api/Pet.Api.csproj", "src/Pet.Api/"]
RUN dotnet restore "./src/Pet.Api/Pet.Api.csproj"
COPY . .
WORKDIR "/src/src/Pet.Api"
RUN dotnet build "./Pet.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Pet.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false


# Copie o certificado CA para o contêiner
# COPY path/to/your/certificate.cer /usr/local/share/ca-certificates/certificate.cer

# Atualize os certificados
# RUN update-ca-certificates

# Defina a variável de ambiente ASPNETCORE_ENVIRONMENT
ENV ASPNETCORE_ENVIRONMENT=Development


# Defina variáveis de ambiente específicas para ConnectionStrings, se necessário
ENV ConnectionStrings__DefaultConnection="Server=LINCOLN;Database=DbPet;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Pet.Api.dll"]