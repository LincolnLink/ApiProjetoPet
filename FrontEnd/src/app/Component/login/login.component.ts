import { Component, OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../Module/user';
import { AuthService } from '../../Service/authService';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    RouterModule 
       
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userForm: UntypedFormGroup = new UntypedFormGroup({});  
  user: User = new User();
  errors: any[] = [];

  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  login() {
    this.errors = [];
    if (this.userForm.valid && this.userForm.dirty) {
      let _user = Object.assign({}, this.user, this.userForm.value);

      this.authService.login(_user)
        .subscribe({
          next: (response) => {
            this.onSaveComplete(response)
          },
          error: (fail) => {
            this.onError(fail)
          },
        });
    }
  }

  onSaveComplete(response: any) {
    console.log('Login bem-sucedido:', response);
    this.authService.persistirUserApp(response);    
    this.router.navigate(['/home']);
  }

  onError(fail: any) {
    if (fail.errors && fail.errors.length > 0) {
        this.errors = fail.errors; // Lista de erros retornados pelo backend
    } else if (fail.status === 0) {
        this.errors = ['Não foi possível conectar ao servidor. Verifique sua conexão.'];
    } else {
        this.errors = ['Ocorreu um erro desconhecido.'];
    }
  }
}
