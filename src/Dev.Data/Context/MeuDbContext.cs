﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DevIO.Business.Models;
using Dev.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Dev.Data.Context
{
    public class MeuDbContext : DbContext
    {
        public MeuDbContext(DbContextOptions<MeuDbContext> options) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        public DbSet<Produto> Produtos { get; set; }

        public DbSet<Fornecedor> Fornecedores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Uma garantia, caso seja necessario, define o minimo do varchar
            foreach (var property in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetProperties()
                    .Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("varchar(100)");

            // Comando que pega o mapeamento definido na pasta Mappings.
            // Reflexion não é muito recomendado mas vai fazer uma vez só.
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MeuDbContext).Assembly);

            // Desativando o cascaiter, impede que a classe ao ser excluida, seja excluida junto!
            // Faz uma pesquisa de relações dentro do modelBuild, pegando o tipo das entidades.
            // selectMany cria uma lista, atraves das ForeignKeys, pega o comportamento a pós a exclusão (DeleteBehavior)
            // Passa o "ClientSetNull", 
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys())) relationship.DeleteBehavior = DeleteBehavior.ClientSetNull;

            base.OnModelCreating(modelBuilder);
        }
    }
}
