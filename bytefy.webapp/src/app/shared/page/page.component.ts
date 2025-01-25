import { Component, Input, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    imports: [PanelModule]
})
export class PageComponent {
  @Input() header: string = '';
}
