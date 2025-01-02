import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Service/authService';

@Component({
  selector: 'app-menu-user',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './menu-user.component.html',
  styleUrl: './menu-user.component.css'
})
export class MenuUserComponent {

  saudacao: string = ""

  constructor(private authService: AuthService){}

  userLogado(): boolean {
    var user = this.authService.obterUsuario();
    if (user) {
      this.saudacao = "Olá " + user.email;
      
      return true;
    }
    return false;
  }
  

}
