/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Base64ConverterComponent } from './base64-converter.component';

describe('Base64ConverterComponent', () => {
  let component: Base64ConverterComponent;
  let fixture: ComponentFixture<Base64ConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Base64ConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Base64ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
