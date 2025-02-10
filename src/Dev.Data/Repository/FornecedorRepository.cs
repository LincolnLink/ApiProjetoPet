using Dev.Data.Context;
using Dev.Domain.Interfaces;
using Dev.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dev.Data.Repository
{
    public class FornecedorRepository : Repository<Fornecedor>, IFornecedorRepository
    {

        public FornecedorRepository(MeuDbContext context) : base(context) { }


        //public async Task<Fornecedor> ObterFornecedorEndereco(Guid id)
        //{
        //    return await Db.Fornecedores.AsNoTracking()
        //        .Include(f => f.Endereco)
        //        .FirstOrDefaultAsync(e => e.Id == id);
        //}

        public async Task<Fornecedor> ObterFornecedorProdutosEndereco(Guid id)
        {
            // Retorna o fornecedor com os produtos dele e o endereço dele.
            return await Db.Fornecedores.AsNoTracking()
                .Include(c => c.Produtos)
                .FirstOrDefaultAsync(c => c.Id == id);

            //.Include(c => c.Endereco)
        }
    }
}
