import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCreateUpdateComponent } from './person-create-update.component';

describe('PersonCreateUpdateComponent', () => {
  let component: PersonCreateUpdateComponent;
  let fixture: ComponentFixture<PersonCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
