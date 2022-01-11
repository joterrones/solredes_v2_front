import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfproyectocolorComponent } from './confproyectocolor.component';

describe('ConfproyectocolorComponent', () => {
  let component: ConfproyectocolorComponent;
  let fixture: ComponentFixture<ConfproyectocolorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfproyectocolorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfproyectocolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
