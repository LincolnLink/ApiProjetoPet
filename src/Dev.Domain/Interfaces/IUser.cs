using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Dev.Domain.Interfaces
{
    public interface IUser
    {
        /// <summary>Nome do usuario </summary>
        string Name { get; }

        /// <summary>Obtenha o Id </summary>
        Guid GetUserId();

        /// <summary>Obtenha o email </summary>
        string GetUserEmail();

        /// <summary>Verifica se está autenticado </summary>
        bool IsAuthenticated();

        /// <summary>Verifica se tem a Role informada </summary>
        bool IsInRole(string role);

        /// <summary>Retorna uma lista de Claim </summary>
        IEnumerable<Claim> GetClaimsIdentity();

    }
}
