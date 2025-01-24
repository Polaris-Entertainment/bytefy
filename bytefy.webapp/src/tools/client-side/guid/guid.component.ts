import { Component, OnInit } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule,  } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Clipboard } from '@angular/cdk/clipboard';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { cssFormatUppercase } from '@ng-icons/css.gg';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

interface setting {
  name: string;
  code: string;
}

@Component({
  selector: 'app-guid',
  templateUrl: './guid.component.html',
  styleUrls: ['./guid.component.scss'],
  standalone: true,
  viewProviders: [provideIcons({cssFormatUppercase})],
  imports: [
    NgIconComponent,
    PanelModule,
    DividerModule,
    FloatLabelModule, 
    TextareaModule, 
    FormsModule, 
    RadioButtonModule, 
    CommonModule, 
    ToggleButtonModule, 
    ButtonModule,
    TooltipModule
  ]
})
export class GuidComponent implements OnInit {
  settings: setting[] | undefined;
  selectedGuid: setting | undefined;
  guid: string = '';
  isUppercase: boolean = false;

  constructor(private clipboard: Clipboard) { }

  ngOnInit() {
    this.generateGuid(false);
    this.setGuids();
  }

  onCopyToClipboard(): void {
    this.clipboard.copy(this.selectedGuid?.name!);
  }

  onCasingChange(): void {
    this.isUppercase = !this.isUppercase;

    if (this.isUppercase) {
      this.guid = this.guid.toUpperCase();
    } else {
      this.guid = this.guid.toLowerCase();
    }

    this.setGuids();
  }

  generateGuid(input: boolean) {
    this.guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(character) {
        const randomValue = Math.random() * 16 | 0;
        const value = character === 'x' ? randomValue : (randomValue & 0x3 | 0x8);
        return value.toString(16);
    });

    if (this.isUppercase) {
      this.guid = this.guid.toUpperCase();
    } else {
      this.guid = this.guid.toLowerCase();
    }

    if (input)
      this.setGuids();
  }

  setGuids() {
    this.settings = [
      { name: this.guid, code: '00' },
      { name: `"${this.guid}"`, code: '01' },
      { name: `{${this.guid}}`, code: '02' },
      { name: `new Guid("${this.guid}")`, code: '03' },
      { name: `[Guid("${this.guid}")]`, code: '04' },
    ];

    if (this.settings!.length > 0) {
      this.selectedGuid = this.settings![0];
    }
  }
}
