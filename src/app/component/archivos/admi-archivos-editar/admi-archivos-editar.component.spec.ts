import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiArchivosEditarComponent } from './admi-archivos-editar.component';

describe('AdmiArchivosEditarComponent', () => {
  let component: AdmiArchivosEditarComponent;
  let fixture: ComponentFixture<AdmiArchivosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmiArchivosEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiArchivosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
