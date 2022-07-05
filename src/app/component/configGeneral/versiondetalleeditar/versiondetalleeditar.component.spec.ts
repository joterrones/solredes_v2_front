import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersiondetalleeditarComponent } from './versiondetalleeditar.component';

describe('VersiondetalleeditarComponent', () => {
  let component: VersiondetalleeditarComponent;
  let fixture: ComponentFixture<VersiondetalleeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersiondetalleeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersiondetalleeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
