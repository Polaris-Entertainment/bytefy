/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DdsToPngComponent } from './dds-to-png.component';

describe('DdsToPngComponent', () => {
  let component: DdsToPngComponent;
  let fixture: ComponentFixture<DdsToPngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdsToPngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdsToPngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
