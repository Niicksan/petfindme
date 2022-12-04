import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsNotFoundComponent } from './pets-not-found.component';

describe('PetsNotFoundComponent', () => {
  let component: PetsNotFoundComponent;
  let fixture: ComponentFixture<PetsNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
