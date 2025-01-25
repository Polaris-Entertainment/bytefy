import { Component } from '@angular/core';
import { DynamicLoaderComponent } from '../shared/dynamic-loader/dynamic-loader.component';
import { DefaultComponent } from './default/default.component';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  imports: [DynamicLoaderComponent, DefaultComponent]
})
export class FrontPageComponent {
  pinnedPaths: string[] = JSON.parse(localStorage.getItem('pinnedPaths') || '[]');
  hasPins: boolean = this.pinnedPaths.length > 0;
}
