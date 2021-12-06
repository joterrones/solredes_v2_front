import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportalldataComponent } from './exportalldata.component';

describe('ExportalldataComponent', () => {
  let component: ExportalldataComponent;
  let fixture: ComponentFixture<ExportalldataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportalldataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportalldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
