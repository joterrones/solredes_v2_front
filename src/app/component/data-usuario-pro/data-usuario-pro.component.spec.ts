import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUsuarioProComponent } from './data-usuario-pro.component';

describe('DataUsuarioProComponent', () => {
  let component: DataUsuarioProComponent;
  let fixture: ComponentFixture<DataUsuarioProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataUsuarioProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUsuarioProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
