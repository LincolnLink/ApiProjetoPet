import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../Service/userService';
import { User } from '../../../Module/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastro-usuario',
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
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  cadastroForm: FormGroup;
  errors: any[] = [];

  constructor(
     private fb: FormBuilder,
     private userService: UserService,
     private router: Router,
    ) {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],      
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { mismatch: true };
  } 

  cadastrar(): void {
    if (this.cadastroForm.invalid) return;

    const user: User = this.cadastroForm.value;
    this.userService.register(user).subscribe({
      next: (response) => {
        console.log('Usuário cadastrado com sucesso:', response);
        this.onSaveComplete(response);
      },
      error: (fail) => {        
        console.error('Erro ao cadastrar usuário:', fail.error);
        this.onError(fail)
      },
    });
  }

  // onError(fail: any) {
  //   if (fail.errors && fail.errors.length > 0) {
  //       this.errors = fail.errors; // Lista de erros retornados pelo backend
  //   } else if (fail.status === 0) {
  //       this.errors = ['Não foi possível conectar ao servidor. Verifique sua conexão.'];
  //   } else {
  //       this.errors = ['Ocorreu um erro desconhecido.'];
  //   }
  // }

  onError(fail: any) {
    this.errors = fail?.errors || ['Erro desconhecido. Tente novamente.'];
  }  

  onSaveComplete(response: any) {
    alert('Usuário cadastrado com sucesso! Você será redirecionado para a página de login.');  
    this.router.navigate(['/login']);
  }

}
