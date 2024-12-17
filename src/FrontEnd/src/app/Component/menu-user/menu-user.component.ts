import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../Service/userService';

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

  constructor(private userService: UserService){}

  userLogado(): boolean {
    var user = this.userService.obterUsuario();
    if (user) {
      this.saudacao = "Olá " + user.email;
      
      return true;
    }
    return false;
  }
  

}
