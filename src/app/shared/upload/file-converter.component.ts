import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

interface ProcessedFile {
  name: string;
  link: string;
  format: string;
}

@Component({
  selector: 'app-file-converter',
  templateUrl: 'file-converter.component.html',
  styleUrls: ['file-converter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    ButtonModule,
    PanelModule,
    TableModule
  ]
})
export class FileConverterComponent {
  _fileFormats: string[] = [];
  accept: string = '';

  @Output() fileSelected = new EventEmitter<File[]>();
  @Input() isPreview: boolean = true;
  @Input () title: string = 'File Converter';
  @Input() processedFiles: ProcessedFile[] = [];
  @Input()
  set fileFormats(formats: string[]) {
    this._fileFormats = formats;
    this.accept = formats.join(',');
  }

  get fileFormats(): string[] {
    return this._fileFormats;
  }

  selectedFile: File[] | null = null;

  onFileSelect(event: FileSelectEvent): void {
    this.selectedFile = event.files;
    this.fileSelected.emit(this.selectedFile!);
  }
}