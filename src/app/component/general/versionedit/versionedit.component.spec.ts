import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersioneditComponent } from './versionedit.component';

describe('VersioneditComponent', () => {
  let component: VersioneditComponent;
  let fixture: ComponentFixture<VersioneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersioneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
