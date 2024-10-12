import { Component } from '@angular/core';
import { DualTextareaComponent } from '../../../app/shared/dual-textarea/dual-textarea.component';

@Component({
  selector: 'app-ascii-to-text',
  templateUrl: './ascii-to-text.component.html',
  styleUrls: ['./ascii-to-text.component.scss'],
  standalone: true,
  imports: [DualTextareaComponent]
})
export class AsciiToTextComponent {
  convertedText: string = '';
  convertedAscii: string = '';

  onAsciiChange(input: string): void {
    this.convertedText = this.convertAsciiToText(input);
  }

  convertAsciiToText(ascii: string): string {
    return ascii
      .split(' ')
      .map(char => String.fromCharCode(parseInt(char, 10)))
      .join('');
  }

  onTextChange(input: string): void {
    this.convertedAscii = this.convertTextToAscii(input);
  }

  convertTextToAscii(text: string): string {
    return text
      .split('')
      .map(char => {
        const asciiValue = char.charCodeAt(0).toString();
        return asciiValue.padStart(3, '0');
      })
      .join(' ');
  }
}