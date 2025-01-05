import { Fornecedor } from "./fornecedor";

export class Endereco {
    Id: string = '';
    fornecedorId: string = ''; // Guid convertido para string
    logradouro: string = '';
    numero: string = '';
    complemento: string = '';
    cep: string = '';
    bairro: string = '';
    cidade: string = '';
    estado: string = '';
  
    fornecedor: Fornecedor = new Fornecedor();

    constructor(init?: Partial<Endereco>) {
        Object.assign(this, init);
    }
  }