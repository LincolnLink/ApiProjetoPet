import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './Component/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,    
    FormsModule,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
