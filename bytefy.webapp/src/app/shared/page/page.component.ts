import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matPushPinOutline } from '@ng-icons/material-icons/outline'
import { matPushPinSharp } from '@ng-icons/material-icons/sharp'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    imports: [
      PanelModule, 
      ButtonModule, 
      MenuModule, 
      NgIconComponent, 
      CommonModule, 
      TooltipModule
    ],
    viewProviders: [provideIcons({ matPushPinOutline, matPushPinSharp })]
})
export class PageComponent implements OnInit{
  @Input() header: string = '';
  @Input() pinId: Number = 0;
  @Input() pathId ='';

  isRoot = false;
  isPinned: boolean = false;
  currentPath: string = '';
  displayIcon: string = 'matPushPinOutline';

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) {
    this.currentPath = this.router.url.split('?')[0].replace("/", "");
  }

  ngOnInit(): void {
    if (this.isRootPath()) {
      this.renderer.addClass(this.el.nativeElement, 'root-path');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'root-path');
    }

    this.isPinned = JSON.parse(localStorage.getItem('pinnedPaths') || '[]').includes(this.currentPath);
    this.displayIcon = this.isPinned ? 'matPushPinSharp' : 'matPushPinOutline';
  }

  togglePin(): void {
    this.isPinned = !this.isPinned;
    this.displayIcon = this.isPinned ? 'matPushPinSharp' : 'matPushPinOutline';
    const pinnedPaths = JSON.parse(localStorage.getItem('pinnedPaths') || '[]');

    if (this.isPinned) {
      if (!pinnedPaths.includes(this.currentPath)) {
        pinnedPaths.push(this.currentPath);
      }
    } else {
      const index = pinnedPaths.indexOf(this.currentPath);
      if (index !== -1) {
        pinnedPaths.splice(index, 1);
      }
    }

    localStorage.setItem('pinnedPaths', JSON.stringify(pinnedPaths));
  }

  isRootPath(): boolean {
    this.isRoot = this.currentPath === '';
    return this.isRoot;
  }
}
