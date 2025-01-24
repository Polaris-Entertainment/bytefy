import { Component, OnInit, Renderer2 } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FileUploadModule } from 'primeng/fileupload';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MessageModule } from 'primeng/message';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { ColorPickerChangeEvent, ColorPickerModule } from 'primeng/colorpicker';

export interface QrCodeError {
  error: boolean;
  message: string;
}

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.scss'],
  standalone: true,
  imports: [
    QRCodeModule, 
    AccordionModule, 
    PanelModule, 
    TagModule, 
    InputTextModule, 
    ButtonModule, 
    ToolbarModule, 
    CommonModule, 
    FloatLabelModule, 
    TextareaModule,
    FileUploadModule,
    MessageModule,
    SelectButtonModule,
    ColorPickerModule
  ]
})
export class QrCodeGeneratorComponent implements OnInit {
  qrCodeData: string = 'bytefy.net';
  isBeta = true;
  extendedInput = false;
  activeTabs: number[] = [1];
  expandIcon = 'pi pi-angle-up';
  inputedValue: string = '';
  qrCodeImageUrl: SafeUrl = '';
  unsafeUrl: string = '';
  downloadEnabled = false;
  error: QrCodeError = {
    error: false, 
    message: ''
  };
  colorCode: string = '#000000';
  backgroundColorCode: string = '#ffffff';
  level: "L" | "M" | "Q" | "H" | "low" | "medium" | "quartile" | "high" = 'H';
  innerQrCodeimage: string = '';
  qrCodeSize: number = 300;
  correctionLevel: any[] = [
    { level: 'L' },
    { level: 'M' },
    { level: 'Q' },
    { level: 'H' }
  ];
  isMobile: boolean = false;

  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 1021;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1021;
    });
  }

  onImageLinkInputChanged(event: Event): void {
    this.innerQrCodeimage = (event.target as HTMLInputElement).value;
  }

  onLevelSelected(level: SelectButtonChangeEvent): void {
    this.level = level.value;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.item(0);
    
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.qrCodeData = reader.result as string;
      this.validateInput();
    };
    reader.readAsText(file);
  }

  onDataTextInputChanged(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.qrCodeData = input
    this.inputedValue = input;

    this.validateInput();
  }

  onSizeInputChanged(event: Event): void {
    let size = parseInt((event.target as HTMLInputElement).value, 10);

    if(size <= 1000){
      this.qrCodeSize = size;
      this.error.error = false;
    }
    else 
      this.error = {
        error: true,
        message: 'Too large image size, change the field "Size of QR Code". Maximum value is 1000.'
      }; 
  }

  onColorChanged(event: ColorPickerChangeEvent): void {
    this.colorCode = event.value.toString();
  }

  onBackgroundColorChanged(event: ColorPickerChangeEvent): void {
    this.backgroundColorCode = event.value.toString();
  }

  onExpandButtonClick(): void {
    this.extendedInput = !this.extendedInput;
    this.expandIcon = this.extendedInput ? 'pi pi-angle-down' : 'pi pi-angle-up';
  }

  onCodeUrlChanged(url: SafeUrl): void {
    this.qrCodeImageUrl = url;
  }

  onPrintButtonClick(): void {
    const iframe = this.renderer.createElement('iframe');
    this.renderer.setStyle(iframe, 'position', 'absolute');
    this.renderer.setStyle(iframe, 'width', '0');
    this.renderer.setStyle(iframe, 'height', '0');
    this.renderer.setStyle(iframe, 'border', '0');

    document.body.appendChild(iframe);
    iframe.onload = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;

      if (doc) {
        const img = doc.createElement('img');
        img.src = this.sanitizer.sanitize(4, this.qrCodeImageUrl);

        doc.body.appendChild(img);

        iframe.contentWindow?.print();

        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }
    };
 
    iframe.srcdoc = '<html><head><title>Bytefy.net Print QR Code</title></head><body></body></html>';
  }

  validateInput(): void {
    this.error = {
      error: this.qrCodeData.length > 1269,
      message: 'File size is too large.'
    };
  }
}
