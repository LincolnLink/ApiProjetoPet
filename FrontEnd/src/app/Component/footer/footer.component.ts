import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,        // Necessário para diretivas básicas como *ngIf e *ngFor
    MatToolbarModule,    // Módulo para usar <mat-toolbar>
    MatButtonModule      // Módulo para usar botões do Material Design
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
