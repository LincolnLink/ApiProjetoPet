import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ProdutoService } from '../../../Service/produtoService';
import { Produto } from '../../../Module/produto';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-lista-produto',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLinkActive,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './lista-produto.component.html',
  styleUrl: './lista-produto.component.css'
})
export class ListaProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }

  public produtos: Produto[] = [];
  public imageURL: string = "";
  errorMessage: string = "";

  displayedColumns: string[] = [
    'imagem', 
    'nome', 
    'nomeFornecedor', 
    'valor', 
    'ativo', 
    'acoes'
  ];
  
  ngOnInit() {
    this.produtoService.obterTodos()
      .subscribe(
        {
          next: (produtos) => { this.produtos = produtos },
          error: (error) => { this.errorMessage = error },
        }
       
    );   
  }
}
