import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import HeaderComponent from '../components/header/header.component';
import FooterComponent from '../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `
})
export default class LayoutComponent {}