import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersioneditarComponent } from './versioneditar.component';

describe('VersioneditarComponent', () => {
  let component: VersioneditarComponent;
  let fixture: ComponentFixture<VersioneditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersioneditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersioneditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
