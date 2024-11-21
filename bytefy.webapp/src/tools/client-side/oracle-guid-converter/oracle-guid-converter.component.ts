import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-oracle-guid-converter',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './oracle-guid-converter.component.html',
  styleUrl: './oracle-guid-converter.component.scss'
})
export class OracleGuidConverterComponent {
  guidInput: string = '';
  rawOutput: string = '';
  convertedGuid: string = '';

  private isValidGuid(guid: string): boolean {
    const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return guidPattern.test(guid);
  }

  private isValidRaw(raw: string): boolean {
    const rawPattern = /^[0-9a-fA-F]{32}$/;
    return rawPattern.test(raw);
  }

  private guidToRaw(guid: string): string {
    const hexParts = guid.replace(/-/g, '');
    const guidBytes = Array.from({ length: 16 }, (_, i) =>
      parseInt(hexParts.substr(i * 2, 2), 16)
    );

    const reorderedBytes = [
      guidBytes[3], guidBytes[2], guidBytes[1], guidBytes[0],
      guidBytes[5], guidBytes[4],
      guidBytes[7], guidBytes[6],
      ...guidBytes.slice(8, 16)
    ];

    return reorderedBytes.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  private rawToGuid(raw: string): string {
    const rawBytes = Array.from({ length: 16 }, (_, i) =>
      parseInt(raw.substring(i * 2, i * 2 + 2), 16)
    );

    const reorderedBytes = [
      rawBytes[3], rawBytes[2], rawBytes[1], rawBytes[0],
      rawBytes[5], rawBytes[4],
      rawBytes[7], rawBytes[6],
      ...rawBytes.slice(8, 16)
    ];

    const hexArray = reorderedBytes.map(b => b.toString(16).padStart(2, '0'));
    
    return [
      hexArray.slice(0, 4).join(''),
      hexArray.slice(4, 6).join(''),
      hexArray.slice(6, 8).join(''),
      hexArray.slice(8, 10).join(''),
      hexArray.slice(10, 16).join('')
    ].join('-');
  }

  onConvertToRaw(): void {
    if (this.isValidGuid(this.guidInput)) {
      this.rawOutput = this.guidToRaw(this.guidInput);
    } else {
      this.rawOutput = 'Invalid GUID format';
    }
  }

  onConvertToGuid(): void {
    if (this.isValidRaw(this.rawOutput)) {
      this.convertedGuid = this.rawToGuid(this.rawOutput);
    } else {
      this.convertedGuid = 'Invalid RAW(16) format';
    }
  }
}
