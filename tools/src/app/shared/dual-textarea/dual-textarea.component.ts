import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-dual-textarea',
  templateUrl: 'dual-textarea.component.html',
  styleUrls: ['dual-textarea.component.scss'],
  standalone: true,
  imports: [
    FloatLabelModule, 
    InputTextareaModule, 
    FormsModule, 
    PanelModule, 
    CommonModule,
    TagModule
  ]

})
export class DualTextareaComponent {
  @Input() topDisabled: boolean = false;
  @Input() bottomDisabled: boolean = false;
  @Input() title: string = 'Dual Textarea';
  @Input() topPlaceholder: string = 'Left Textarea';
  @Input() bottomPlaceholder: string = 'Right Textarea';
  @Input() topValue: string = '';
  @Input() bottomValue: string = '';
  @Input() isBeta: boolean = false;
  @Output() topChange = new EventEmitter<string>();
  @Output() bottomChange = new EventEmitter<string>();

  onTopChange(event: Event): void {
    const input = (event.target as HTMLTextAreaElement).value;
    this.topChange.emit(input);
  }

  onBottomChange(event: Event): void {
    const input = (event.target as HTMLTextAreaElement).value;
    this.bottomChange.emit(input);
  }
}