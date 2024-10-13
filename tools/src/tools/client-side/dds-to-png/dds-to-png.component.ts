import { Component, OnInit } from '@angular/core';
import { FileConverterComponent } from '../../../app/shared/upload/file-converter.component';
import { DdsToPngService } from './dds-to-png.service';
import { ProcessedFile } from '../../../app/models/conversion.model';

@Component({
  selector: 'app-dds-to-png',
  templateUrl: './dds-to-png.component.html',
  styleUrls: ['./dds-to-png.component.scss'],
  standalone: true,
  imports: [FileConverterComponent]
})
export class DdsToPngComponent {

  processedFiles: ProcessedFile[] = [];
  fileFormats: string[] = [".dds"];

  constructor(private ddsToPngService: DdsToPngService) { }

  onFileSelected(input: File[]): void {
    if (input.length > 0) {
      const file = input[0];
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const ddsArrayBuffer = reader.result as ArrayBuffer;
          const pngDataUrl = await this.ddsToPngService.ddsToPng(ddsArrayBuffer);

          const blob = await (await fetch(pngDataUrl)).blob();
          const blobUrl = URL.createObjectURL(blob);

          const processedFile: ProcessedFile = {
            name: file.name.replace('.dds', '.png'),
            link: blobUrl,
            format: 'png'
          };
          this.processedFiles.push(processedFile);

          console.log('Processed Files:', this.processedFiles);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
}
