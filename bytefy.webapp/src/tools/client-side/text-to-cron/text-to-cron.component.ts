import { Component } from '@angular/core';
import { DualTextareaComponent } from '../../../app/shared/dual-textarea/dual-textarea.component';

@Component({
    selector: 'app-text-to-cron',
    templateUrl: './text-to-cron.component.html',
    styleUrls: ['./text-to-cron.component.scss'],
    imports: [DualTextareaComponent]
})
export class TextToCronComponent {
  cronExpression: string = '';

  getCronExpression(description: string): string {
    let minute = "*";
    let hour = "*";
    let dayOfMonth = "*";
    let month = "*";
    let dayOfWeek = "*";
  
    description = description.toLowerCase().trim();
  
    const parts = description.split(" ");
    parts.forEach((part, index) => {
      if (part === "minute" || part === "minutes") {
        if (index > 0 && !isNaN(parseInt(parts[index - 1]))) {
          minute = `*/${parts[index - 1]}`;
        }
      } else if (part === "hour" || part === "hours") {
        if (index > 0 && !isNaN(parseInt(parts[index - 1]))) {
          hour = `*/${parts[index - 1]}`;
        }
      } else if (part === "day" && parts[index + 1] === "of") {
        if (parts[index + 2] === "month" && index > 0 && !isNaN(parseInt(parts[index - 1]))) {
          dayOfMonth = `${parts[index - 1]}`;
        } else if (parts[index + 2] === "week" && index > 0 && !isNaN(parseInt(parts[index - 1]))) {
          dayOfWeek = `${parts[index - 1]}`;
        }
      } else if (part === "month" || part === "months") {
        if (index > 0 && !isNaN(parseInt(parts[index - 1]))) {
          month = `*/${parts[index - 1]}`;
        }
      }
    });
  
    this.cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
  }
}
