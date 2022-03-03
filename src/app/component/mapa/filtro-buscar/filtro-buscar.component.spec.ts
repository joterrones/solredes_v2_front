import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBuscarComponent } from './filtro-buscar.component';

describe('FiltroBuscarComponent', () => {
  let component: FiltroBuscarComponent;
  let fixture: ComponentFixture<FiltroBuscarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroBuscarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
