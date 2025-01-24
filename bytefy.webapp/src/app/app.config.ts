import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNgIconsConfig } from '@ng-icons/core';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { bytefy_dark } from './bytefy-dark-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync("animations"), 
    providePrimeNG({ 
      theme: {
          preset: bytefy_dark
      }
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
    provideHttpClient(),
    importProvidersFrom(HttpClientXsrfModule.withOptions({
      cookieName: 'X-XSRF-TOKEN',
      headerName: '2311d8d8-607d-4747-8939-1bde65643254',
    }))
  ]
};
