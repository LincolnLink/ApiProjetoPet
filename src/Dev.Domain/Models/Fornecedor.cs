﻿using Dev.Domain.Enum;
using DevIO.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dev.Domain.Models
{
    public class Fornecedor : Entity
    {
        public string Nome { get; set; }
        public string Documento { get; set; }
        public TipoFornecedor TipoFornecedor { get; set; }

        //public Endereco Endereco { get; set; }

        public bool Ativo { get; set; }

        /* EF Relations */
        public IEnumerable<Produto>? Produtos { get; set; }
    }
}
