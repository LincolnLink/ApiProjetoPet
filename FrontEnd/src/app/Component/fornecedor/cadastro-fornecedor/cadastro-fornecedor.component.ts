import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { FornecedorService } from '../../../Service/fornecedorService'
import { Fornecedor } from '../../../Interface/fornecedor';

@Component({
  selector: 'app-cadastro-fornecedor',
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
  templateUrl: './cadastro-fornecedor.component.html',
})
export class CadastroFornecedorComponent implements OnInit {
  fornecedorForm!: FormGroup;
  errors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    this.fornecedorForm = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      tipoFornecedor: ['', Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        cep: ['', [Validators.required, Validators.maxLength(8)]],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', [Validators.required, Validators.maxLength(2)]],
      }),
      ativo: [false],
    });
  }

  cadastrarFornecedor() {
    if (this.fornecedorForm.valid) {
      const fornecedor = this.fornecedorForm.value as Fornecedor;

      this.fornecedorService.cadastrarFornecedor(fornecedor).subscribe({
        next: () => this.router.navigate(['/fornecedores']),
        error: (error) => {
          this.errors = error.errors || ['Erro ao cadastrar fornecedor.'];
        },
      });
    }
  }
}
