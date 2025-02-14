using Dev.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dev.Domain.Interfaces
{
    public interface IFornecedorRepository : IRepository<Fornecedor>
    {
        Task<Fornecedor> ObterFornecedorPorId(Guid id);

        Task<Fornecedor> ObterFornecedorPorIdProdutos(Guid id);
    }
}
