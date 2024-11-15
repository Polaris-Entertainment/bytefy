/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TextToCronComponent } from './text-to-cron.component';

describe('TextToCronComponent', () => {
  let component: TextToCronComponent;
  let fixture: ComponentFixture<TextToCronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextToCronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextToCronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
