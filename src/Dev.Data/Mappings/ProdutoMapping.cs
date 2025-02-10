using Dev.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dev.Data.Mappings
{
    public class ProdutoMapping : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            // Define a chave primaria
            builder.HasKey(p => p.Id);

            // Define o campo como requirido, define o tipo da coluna            
            builder.Property(p => p.Nome)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.Valor)
                .IsRequired()
                .HasColumnType("decimal");

            // Define o campo como requirido, define o tipo da coluna            
            builder.Property(p => p.Descricao)
                .HasColumnType("varchar(1000)");

            // Define o campo como requirido, define o tipo da coluna            
            builder.Property(p => p.Imagem)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.ToTable("Produtos");

        }
    }
}
