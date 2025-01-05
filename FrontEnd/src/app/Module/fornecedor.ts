import { Endereco } from "./endereco";
import { Produto } from "./produto";
import { TipoFornecedor } from "./TipoFornecedor ";

export class Fornecedor {
    nome: string = '';
    documento: string = '';
    tipoFornecedor: TipoFornecedor = TipoFornecedor.PessoaFisica;
    endereco: Endereco = new Endereco();
    ativo: boolean = false;
  
    // Relação com produtos
    produtos: Produto[] = [];
  
    constructor(init?: Partial<Fornecedor>) {
        Object.assign(this, init);
    }
  }