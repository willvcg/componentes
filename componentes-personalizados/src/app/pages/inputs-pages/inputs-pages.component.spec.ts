import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsPagesComponent } from './inputs-pages.component';

describe('InputsPagesComponent', () => {
  let component: InputsPagesComponent;
  let fixture: ComponentFixture<InputsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputsPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
