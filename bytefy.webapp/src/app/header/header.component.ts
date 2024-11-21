import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
		styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [MegaMenuModule, ButtonModule, CommonModule, AvatarModule]
})
export class HeaderComponent implements OnInit {
  items: MegaMenuItem[] | undefined;
	isDarkMode: boolean = true;

  ngOnInit() {
    this.isDarkMode = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches;

      this.items = [
          {
						label: 'Tools',
						icon: 'pi pi-wrench',
						items: [
							[
								{
									label: 'Text Tools',
									items: [
											{
												label: 'Text counter',
												routerLink: 'text-counter',
												routerLinkActiveOptions: { exact: true }
											},
											{
												label: 'Guid Generator',
												routerLink: 'guid',
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
								},
								{
									label: 'Media Tools',
									items: [
										{
											label: 'Color picker',
											routerLink: 'color-picker',
											routerLinkActiveOptions: { exact: true }
										}
									]
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
									label: 'Convert',
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
										},
										{
											label: 'Base64 Converter',
											routerLink: 'base64-converter',
											routerLinkActiveOptions: { exact: true }
										},
										{
											label: 'Ascii to text',
											routerLink: 'ascii-to-text',
											routerLinkActiveOptions: { exact: true }
										},
										{
											label: 'Oracle GUID Converter',
											routerLink: 'oracle-guid-converter',
											routerLinkActiveOptions: { exact: true }
										}
									]
								}
							]
						]
					},
          {
            label: 'Generators',
            icon: 'pi pi-box',
            items: [
              [
                {
                  label: 'Generators',
                  items: [
                    {
                      label: 'QR Code Generator',
                      routerLink: 'qr-code-generator',
                      routerLinkActiveOptions: { exact: true }
                    },
                    {
                      label: 'Guid Generator',
                      routerLink: 'guid',
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