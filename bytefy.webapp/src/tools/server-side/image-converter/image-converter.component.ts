import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ImageService } from './image-converter.service';
import { CommonModule } from '@angular/common';
import { FileConverterComponent } from "../../../app/shared/upload/file-converter.component";
import { Format, ProcessedFile } from '../../../app/models/conversion.model';
import { HttpHeaders } from '@angular/common/http';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-image-converter',
    templateUrl: 'image-converter.component.html',
    styleUrls: ['image-converter.component.scss'],
    imports: [
      DropdownModule, 
      AutoCompleteModule, 
      FormsModule, 
      CommonModule, 
      FileConverterComponent, 
      CardModule
    ]
})
export class ImageConverterComponent implements OnInit, OnDestroy {
  constructor(private ImageService: ImageService) { }

  url = 'http://localhost:1337/convert';
  filteredFormats: string[] = [];
  formats: Format[] = [];
  selectedFormat: string | undefined;
  subscriptions: Subscription[] = [];
  selected = '';
  headers = new HttpHeaders();
  processedFiles: ProcessedFile[] = [];
  fileFormats: string[] = ["image/*"];
  selectedFile: File[] | null = null;

  filterFormats(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let index = 0; index < (this.formats as any[]).length; index++) {
        let format = (this.formats as any[])[index];
        if (format.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(format);
        }
    }

    this.filteredFormats = filtered;
  }

  onUploadClicked() {
    if (this.selectedFormat && this.selectedFile) {
      this.subscriptions.push(
        this.ImageService.getMimeType(this.selectedFormat).subscribe((typeResponse) => {
          this.subscriptions.push(
            this.ImageService.convertImage(this.selectedFile![0], this.selectedFormat!)
              .pipe(map((response: any) => {
                const blob = new Blob([response], { type: typeResponse });
                const blobUrl = URL.createObjectURL(blob);
                const processedFile = {
                  name: this.selectedFile![0].name.replace(/\.[^/.]+$/, `.${this.selectedFormat?.toLowerCase()}`),
                  link: blobUrl,
                  format: this.selectedFormat
                } as ProcessedFile;
                this.processedFiles.push(processedFile);
              }))
              .subscribe()
          );
        })
      );
    }
  }

  onFormatSelected(format: string) {
    this.selectedFormat = format;
  }

  onFileSelected(input: File[]): void {
    this.selectedFile = input;
  }

  ngOnInit(): void { 
    this.subscriptions.push(this.ImageService.setAntiforgeryToken().subscribe());

    this.subscriptions.push(this.ImageService.getFormats()
      .pipe(map(formats => {
        this.formats = formats.map(format => {
          return {
            name: format,
            code: format.toLowerCase()
          } as Format;
        });
      }))
      .subscribe());

    this.headers = new HttpHeaders({
      '2311d8d8-607d-4747-8939-1bde65643254': localStorage.getItem('imgToken')!,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}