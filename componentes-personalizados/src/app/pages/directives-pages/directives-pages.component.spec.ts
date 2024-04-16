import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivesPagesComponent } from './directives-pages.component';

describe('DirectivesPagesComponent', () => {
  let component: DirectivesPagesComponent;
  let fixture: ComponentFixture<DirectivesPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivesPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectivesPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
