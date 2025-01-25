import { Injectable, Type } from '@angular/core';
import { routes } from '../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class DynamicLoaderService {
  private componentLookupTable: Record<string, Type<any>> = {};

  constructor() {
    this.buildLookupTable();
  }

  private buildLookupTable() {
    routes.forEach((route) => {
      if (route.path && route.component) {
        this.componentLookupTable[route.path] = route.component;
      }
    });
  }

  getComponentByPath(path: string): Type<any> | undefined {
    return this.componentLookupTable[path];
  }

  getComponentsByPaths(paths: string[]): Type<any>[] {
    return paths
      .map((path) => this.componentLookupTable[path])
      .filter((component): component is Type<any> => !!component);
  }
}
