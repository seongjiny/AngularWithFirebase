import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoenchComponent } from './moench.component';

describe('MoenchComponent', () => {
  let component: MoenchComponent;
  let fixture: ComponentFixture<MoenchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoenchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
