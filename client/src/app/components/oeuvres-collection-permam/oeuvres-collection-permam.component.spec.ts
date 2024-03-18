import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeuvresCollectionPermamComponent } from './oeuvres-collection-permam.component';

describe('OeuvresCollectionPermamComponent', () => {
  let component: OeuvresCollectionPermamComponent;
  let fixture: ComponentFixture<OeuvresCollectionPermamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OeuvresCollectionPermamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OeuvresCollectionPermamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
