import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportdatoadicionalComponent } from './exportdatoadicional.component';

describe('ExportdatoadicionalComponent', () => {
  let component: ExportdatoadicionalComponent;
  let fixture: ComponentFixture<ExportdatoadicionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportdatoadicionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportdatoadicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
