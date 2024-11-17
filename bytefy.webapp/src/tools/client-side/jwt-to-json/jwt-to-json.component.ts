import { Component } from '@angular/core';
import { DualTextareaComponent } from '../../../app/shared/dual-textarea/dual-textarea.component';

@Component({
  selector: 'app-jwt-to-json',
  templateUrl: './jwt-to-json.component.html',
  styleUrls: ['./jwt-to-json.component.scss'],
  standalone: true,
  imports: [DualTextareaComponent]
})
export class JwtToJsonComponent {
  readableToken: string = '';

  decodeBase64Url(base64Url: string): string {
    const base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/');
      
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return jsonPayload;
  }

  decodeJwtToken(token: string): void {
      const parts = token.split('.');
      
      if (parts.length !== 3) {
        throw new Error('Invalid JWT Token');
      }

      const payload = this.decodeBase64Url(parts[1]);
    try {
      this.readableToken = JSON.stringify(JSON.parse(payload), null, 2);
    } catch (error) {
      this.readableToken = 'Invalid JWT Token';
    }
  }
}