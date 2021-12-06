import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportperfilxlsComponent } from './exportperfilxls.component';

describe('ExportperfilxlsComponent', () => {
  let component: ExportperfilxlsComponent;
  let fixture: ComponentFixture<ExportperfilxlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportperfilxlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportperfilxlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
