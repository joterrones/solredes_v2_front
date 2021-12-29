import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosEditarComponent } from './archivos-editar.component';

describe('ArchivosEditarComponent', () => {
  let component: ArchivosEditarComponent;
  let fixture: ComponentFixture<ArchivosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivosEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
