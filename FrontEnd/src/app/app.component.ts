import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './Component/footer/footer.component';
import { MenuUserComponent } from './Component/menu-user/menu-user.component';
import { AuthService } from './Service/authService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,    
    FormsModule,
    FooterComponent,
    MenuUserComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav; // Adicione esta propriedade
  title = 'FrontEnd';

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
  

}
