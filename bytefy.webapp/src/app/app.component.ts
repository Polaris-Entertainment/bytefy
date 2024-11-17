import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PrimeNGConfig } from 'primeng/api';
import { FooterComponent } from './footer/footer.component';
import { Lara } from 'primeng/themes/lara';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tools';

  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({ 
      preset: Lara,
      darkModeSelector: '.darkmode' 
    });
  }
  ngOnInit(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('darkmode');
  }
}