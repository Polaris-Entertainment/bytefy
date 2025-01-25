import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Type,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DynamicLoaderService } from './dynamic-loader.service';

@Component({
  selector: 'app-dynamic-loader',
  templateUrl: './dynamic-loader.component.html',

})
export class DynamicLoaderComponent implements OnChanges {
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  @Input() paths: string[] = [];

  constructor(private dynamicComponentService: DynamicLoaderService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paths']) {
      this.loadComponents();
    }
  }

  private loadComponents() {
    this.container.clear();

    const components: Type<any>[] =
      this.dynamicComponentService.getComponentsByPaths(this.paths);

    components.forEach((component) => {
      this.container.createComponent(component);
    });
  }
}