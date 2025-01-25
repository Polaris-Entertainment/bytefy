import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DividerModule,
    RouterLink
  ],
})
export class DefaultComponent {
  tools = [
    { name: 'Image Converter', description: 'Convert images between various formats.', link: '/image-converter' },
    { name: 'GUID Generator', description: 'Generate unique GUIDs for your projects.', link: '/guid' },
    { name: 'Color Picker', description: 'Pick and preview colors for web design.', link: '/color-picker' },
    { name: 'JWT Reader', description: 'Decode and view JWT tokens.', link: '/jwt-decoder' },
    { name: 'Cron Job Expression Creator', description: 'Create cron expressions for scheduling jobs.', link: '/text-to-cron' },
    { name: 'QR Code Generator', description: 'Generate custom QR codes, from text or files.', link: '/qr-code-generator' },
  ];
}
