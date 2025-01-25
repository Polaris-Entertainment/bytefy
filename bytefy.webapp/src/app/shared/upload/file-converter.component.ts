import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSelectEvent, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { HttpHeaders } from '@angular/common/http';
import { TagModule } from 'primeng/tag';
import { PageComponent } from '../page/page.component';

interface ProcessedFile {
  name: string;
  link: string;
  format: string;
}

@Component({
    selector: 'app-file-converter',
    templateUrl: 'file-converter.component.html',
    styleUrls: ['file-converter.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        FileUploadModule,
        ButtonModule,
        PanelModule,
        TableModule,
        AutoCompleteModule,
        BadgeModule,
        TagModule,
        PageComponent
    ]
})
export class FileConverterComponent implements OnInit {
  _fileFormats: string[] = [];
  accept: string = '';
  selected = '';
  invalidFileTypeMessageSummary: string = '';
  url: string = '';
  requestHeaders: any;
  selectedFile: File[] | null = null;

  @Output() fileSelected = new EventEmitter<File[]>();
  @Input() isBeta: boolean = false;
  @Input() filteredFiles: string[] = [];
  @Input() isPreview: boolean = true;
  @Input() title: string = 'File Converter';
  @Input() processedFiles: ProcessedFile[] = [];
  @Input()
  set fileFormats(formats: string[]) {
    this._fileFormats = formats;
    this.accept = formats.join(',');
  }

  // File type selector
  @Output() autoComplete = new EventEmitter<AutoCompleteCompleteEvent>();
  @Output() selectedFormat = new EventEmitter<string>();
  @Input() fileTypeSelector: boolean = false;

  // Upload file to server
  @Input() baseUrl = '';
  @Input() method : 'post' | 'put' = 'post';
  @Input() headers: HttpHeaders = new HttpHeaders();
  @Output() upload = new EventEmitter<FileUploadEvent>();

  get fileFormats(): string[] {
    return this._fileFormats;
  }

  ngOnInit(): void {
    this.requestHeaders = this.headers;
  }

  choose(_: any, callback: () => void) {
      callback();
  }

  onFileSelect(event: FileSelectEvent): void {
    this.selectedFile = event.currentFiles;
    this.fileSelected.emit(this.selectedFile!);
  }

  onAutoComplete(event: AutoCompleteCompleteEvent): void {
    this.autoComplete.emit(event);
  }

  onAutoCompleteDropdownClick(event: AutoCompleteSelectEvent): void {
    this.selectedFormat.emit(event.value.name);
    this.selected = event.value.name;
  }

  onUploadEvent() {
    this.upload.emit();
  }
}