import { Component, OnInit } from '@angular/core';
import { DualTextareaComponent } from '../../../app/shared/dual-textarea/dual-textarea.component';

@Component({
  selector: 'app-word-counter',
  templateUrl: './word-counter.component.html',
  styleUrls: ['./word-counter.component.scss'],
  standalone: true,
  imports: [DualTextareaComponent]
})
export class WordCounterComponent {
  words: number = 0;
  characters: number = 0;
  spaces: number = 0;
  lines: number = 0;
  sentences: number = 0;
  paragraphs: number = 0;
  result = '';

  onTextChange(text: string): void {
    this.words = text.split(/\s+/).filter(w => w.length > 0).length;
    this.characters = text.length;
    this.spaces = text.split(' ').length - 1;
    this.lines = text.split('\n').length;
    this.sentences = text.split(/[.!?]+/).length - 1;
    this.paragraphs = text.split('\n\n').length;

    this.result = `Words: ${this.words}\n`;
    this.result += `Characters: ${this.characters}\n`;
    this.result += `Spaces: ${this.spaces}\n`;
    this.result += `Lines: ${this.lines}\n`;
    this.result += `Sentences: ${this.sentences}\n`;
    this.result += `Paragraphs: ${this.paragraphs}`;
  }
}
