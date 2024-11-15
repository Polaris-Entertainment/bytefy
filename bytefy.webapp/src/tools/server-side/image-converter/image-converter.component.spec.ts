/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImageConverterComponent } from './image-converter.component';

describe('ImageConverterComponent', () => {
  let component: ImageConverterComponent;
  let fixture: ComponentFixture<ImageConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
