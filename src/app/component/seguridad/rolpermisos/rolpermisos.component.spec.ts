import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolpermisosComponent } from './rolpermisos.component';

describe('RolpermisosComponent', () => {
  let component: RolpermisosComponent;
  let fixture: ComponentFixture<RolpermisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolpermisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolpermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
