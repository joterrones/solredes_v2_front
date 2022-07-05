import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersiondetalleComponent } from './versiondetalle.component';

describe('VersiondetalleComponent', () => {
  let component: VersiondetalleComponent;
  let fixture: ComponentFixture<VersiondetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersiondetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersiondetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
