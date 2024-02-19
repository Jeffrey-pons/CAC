import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextexpositionComponent } from './nextexposition.component';

describe('NextexpositionComponent', () => {
  let component: NextexpositionComponent;
  let fixture: ComponentFixture<NextexpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextexpositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextexpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
