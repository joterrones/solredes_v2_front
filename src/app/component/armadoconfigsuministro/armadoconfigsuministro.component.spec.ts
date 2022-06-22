import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmadoconfigsuministroComponent } from './armadoconfigsuministro.component';

describe('ArmadoconfigsuministroComponent', () => {
  let component: ArmadoconfigsuministroComponent;
  let fixture: ComponentFixture<ArmadoconfigsuministroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmadoconfigsuministroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmadoconfigsuministroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
