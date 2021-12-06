import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportControlObraXlsComponent } from './export-control-obra-xls.component';

describe('ExportControlObraXlsComponent', () => {
  let component: ExportControlObraXlsComponent;
  let fixture: ComponentFixture<ExportControlObraXlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportControlObraXlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportControlObraXlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
