import { Component, OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../Module/user';
import { UserService } from '../../Service/userService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,    
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
    private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  login() {
    if (this.userForm.valid && this.userForm.dirty) {
      let _user = Object.assign({}, this.user, this.userForm.value);

      this.userService.login(_user)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
    }
  }

  onSaveComplete(response: any) {
    this.userService.persistirUserApp(response);
    this.router.navigateByUrl('/lista-produtos');
  }

  onError(fail: any) {
    console.log('erro console:', fail.error);
    this.errors = fail.error?.errors ? fail.error?.errors  : [] ;
  }
}
