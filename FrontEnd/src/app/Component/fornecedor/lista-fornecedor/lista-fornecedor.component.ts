import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FornecedorService } from '../../../Service/fornecedorService';
import { Fornecedor } from '../../../Interface/fornecedor';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-lista-fornecedor',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLinkActive,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './lista-fornecedor.component.html',
  styleUrls: ['./lista-fornecedor.component.css'],
})
export class ListaFornecedorComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  errorMessage: string = '';

  displayedColumns: string[] = ['nome', 'cnpj', 'endereco', 'acoes'];

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit() {
    this.fornecedorService.obterTodos().subscribe({
      next: (fornecedores) => (this.fornecedores = fornecedores),
      error: (error) => (this.errorMessage = 'Erro ao carregar fornecedores.'),
    });
  }
}
