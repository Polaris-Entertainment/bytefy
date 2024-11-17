import { Component } from '@angular/core';
import { DualTextareaComponent } from '../../../app/shared/dual-textarea/dual-textarea.component';

@Component({
  selector: 'app-base64-converter',
  templateUrl: './base64-converter.component.html',
  styleUrls: ['./base64-converter.component.scss'],
  standalone: true,
  imports: [DualTextareaComponent]
})
export class Base64ConverterComponent {
  convertedBase64: string = '';
  convertedText: string = '';

  base64Encoded(event: string): void {
    this.convertedBase64 = btoa(event);
    this.convertedText = event;
  }

  base64Decoded(event: string): void {
    this.convertedText = atob(event);
    this.convertedBase64 = event;
  }
}