import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PrimeNGConfig } from 'primeng/api';
import { Lara } from 'primeng/themes/lara';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tools';

  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({ 
      preset: Lara,
      darkModeSelector: '.darkmode' 
    });
  }
}