import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ProdutoService } from '../../../Service/produtoService';
import { UserService } from '../../../Service/userService';
import { Fornecedor } from '../../../Interface/fornecedor';
import { Produto } from '../../../Module/produto';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLinkActive,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})
export class CadastroProdutoComponent implements OnInit {

  produtoForm: UntypedFormGroup = new UntypedFormGroup({});
  produto: Produto = new Produto();
  errors: any[] = [];
  fornecedores: Fornecedor[] = [];
  imagemForm: any;
  imagemNome: string = "";
  imageBase64: any;

  nomeImagem: string = ''; // Variável para armazenar o nome do arquivo
   

  constructor(private fb: UntypedFormBuilder,
              private router: Router,              
              private produtoService: ProdutoService) {

    this.produtoService.obterFornecedores()
      .subscribe(
        {
          next:  fornecedores => this.fornecedores = fornecedores,
          error: (fail) => {

            if (fail.error && fail.error.errors) {
              this.errors = fail.error.errors;
            } else {
              this.errors = ['Ocorreu um erro desconhecido.'];
            }
          } 
        }
      );

    this.imagemForm = new FormData();
  }

  ngOnInit(): void {

    this.produtoForm = this.fb.group({
      fornecedorId: '',
      nome: '',
      descricao: '',
      imagemUpload: '',
      imagem: '',
      valor: '0',
      ativo: new UntypedFormControl(false),
      nomeFornecedor: ''
    });
  }

  cadastrarProduto() {
    if (this.produtoForm.valid && this.produtoForm.dirty) {

      let produtoForm = Object.assign({}, this.produto, this.produtoForm.value);
      
      produtoForm.ativo = this.produtoForm.get('ativo')?.value
      produtoForm.valor = parseFloat(this.produtoForm.get('valor')?.value)

      this.produtoHandle(produtoForm)
        .subscribe(
          {
            next: result => { this.onSaveComplete(result) },
            error:  fail => { this.onError(fail) }
          }
        );
    }
  }

  onSaveComplete(response: any) {
    this.router.navigate(['/lista-produtos']);
  }

  onError(fail: any) {
    if (fail.error && fail.error.errors) {
      this.errors = fail.error.errors;
    } else {
      this.errors = ['Ocorreu um erro desconhecido.'];
    }
  }

  produtoHandleAlternativo(produto: Produto): Observable<Produto> {

    let formdata = new FormData();
    produto.imagem = this.imagemNome;
    produto.imagemUpload = '';

    formdata.append('produto', JSON.stringify(produto));
    formdata.append('ImagemUpload', this.imagemForm, this.imagemNome);

    return this.produtoService.registrarProdutoAlternativo(formdata);
  }

  produtoHandle(produto: Produto): Observable<Produto> {

    produto.imagemUpload = this.imageBase64;
    produto.imagem = this.imagemNome;
   
    
    return this.produtoService.registrarProduto(produto);
  }

  upload(event: Event): void {
      // Verifica se o evento é de um input de arquivo
    const target = event.target as HTMLInputElement; // Faz a asserção de tipo

    // Verifica se a propriedade 'files' está presente no input
    if (target && target.files && target.files.length > 0) {
      const file = target.files[0]; // Acessa o arquivo selecionado
      
      console.log("arquivo: ", file);

      if (file) {
        this.nomeImagem = file.name; // Atribui o nome do arquivo à variável
      }

      // Configurações para upload via IFormFile
      this.imagemForm = file;
      this.imagemNome = file.name;

      // Configurações para upload via base64
      const reader = new FileReader();
      reader.onload = (readerEvt: ProgressEvent<FileReader>) => {
        this.manipularReader(readerEvt);
      };
      reader.onerror = (error) => {
        console.error('Erro ao ler o arquivo:', error);
      };
      reader.readAsDataURL(file); // Lê o arquivo como uma string base64
    } else {
      console.warn('Nenhum arquivo selecionado.');
    }
  }
  
  manipularReader(readerEvt: ProgressEvent<FileReader>): void {
    // O readerEvt.result já contém a string Base64
    const dataUrl = readerEvt.target?.result as string;
  
    // Se precisar, você pode extrair a parte Base64 do Data URL
    const base64 = dataUrl.split(',')[1]; // Remove a parte 'data:image/jpeg;base64,'
  
    this.imageBase64 = base64;
  }
  
   
}
