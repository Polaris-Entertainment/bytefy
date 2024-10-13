import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [MegaMenuModule, ButtonModule, CommonModule, AvatarModule]
})
export class HeaderComponent implements OnInit {
  items: MegaMenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
						label: 'Text Tools',
						icon: 'pi pi-box',
						items: [
							[
								{
									items: [
											{
													label: 'Ascii to text',
													routerLink: 'ascii-to-text',
													routerLinkActiveOptions: { exact: true }
											},
											{
												label: 'Guid Generator',
												routerLink: 'guid',
												routerLinkActiveOptions: { exact: true }
											},
											{
												label: 'Base64 Converter',
												routerLink: 'base64-converter',
												routerLinkActiveOptions: { exact: true }
											},
											{
												label: 'Jwt decoder',
												routerLink: 'jwt-decoder',
												routerLinkActiveOptions: { exact: true }
											},
											{
												label: 'Text to Cron Expression',
												routerLink: 'text-to-cron',
												routerLinkActiveOptions: { exact: true }
											}
									],
									
								}
							]
            ]
          },
					{
						label: 'Conversion',
						icon: 'pi pi-box',
						items: [
							[
								{
									items: [
										{
											label: 'DDS to PNG',
											routerLink: 'dds-to-png',
											routerLinkActiveOptions: { exact: true }
										},
										{
											label: 'Image Converter',
											routerLink: 'image-converter',
											routerLinkActiveOptions: { exact: true }
										}
									]
								}
							]
						]
					}
      ]
  }
}