import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiArchivosComponent } from './admi-archivos.component';

describe('AdmiArchivosComponent', () => {
  let component: AdmiArchivosComponent;
  let fixture: ComponentFixture<AdmiArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmiArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
