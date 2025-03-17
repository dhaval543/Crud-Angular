import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClicableSpanComponent } from './clicable-span.component';

describe('ClicableSpanComponent', () => {
  let component: ClicableSpanComponent;
  let fixture: ComponentFixture<ClicableSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClicableSpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClicableSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
