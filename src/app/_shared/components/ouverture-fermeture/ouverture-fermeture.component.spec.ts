import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvertureFermetureComponent } from './ouverture-fermeture.component';

describe('OuvertureFermetureComponent', () => {
  let component: OuvertureFermetureComponent;
  let fixture: ComponentFixture<OuvertureFermetureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OuvertureFermetureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OuvertureFermetureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
