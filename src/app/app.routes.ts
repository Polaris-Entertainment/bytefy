import { Routes } from '@angular/router';
import { AsciiToTextComponent } from '../tools/ascii-to-text/ascii-to-text.component';
import { GuidComponent } from '../tools/guid/guid.component';
import { Base64ConverterComponent } from '../tools/base64-converter/base64-converter.component';
import { JwtToJsonComponent } from '../tools/jwt-to-json/jwt-to-json.component';
import { TextToCronComponent } from '../tools/text-to-cron/text-to-cron.component';

// create route to the ascii-to-text component
export const routes: Routes = [
  {
    path: 'ascii-to-text',
    pathMatch: 'full',
    component: AsciiToTextComponent
  },
  {
    path: 'guid',
    pathMatch: 'full',
    component: GuidComponent
  },
  {
    path: 'base64-converter',
    pathMatch: 'full',
    component: Base64ConverterComponent
  },
  {
    path: 'jwt-decoder',
    pathMatch: 'full',
    component: JwtToJsonComponent
  },
  {
    path: 'text-to-cron',
    pathMatch: 'full',
    component: TextToCronComponent
  }
];

