import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNgIconsConfig } from '@ng-icons/core';
import { HttpClientXsrfModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync("animations"), 
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
