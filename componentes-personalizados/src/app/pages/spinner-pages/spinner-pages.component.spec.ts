import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerPagesComponent } from './spinner-pages.component';

describe('SpinnerPagesComponent', () => {
  let component: SpinnerPagesComponent;
  let fixture: ComponentFixture<SpinnerPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
