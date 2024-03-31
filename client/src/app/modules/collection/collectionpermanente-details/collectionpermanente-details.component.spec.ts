import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionpermanenteDetailsComponent } from './collectionpermanente-details.component';

describe('CollectionpermanenteDetailsComponent', () => {
  let component: CollectionpermanenteDetailsComponent;
  let fixture: ComponentFixture<CollectionpermanenteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionpermanenteDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionpermanenteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
