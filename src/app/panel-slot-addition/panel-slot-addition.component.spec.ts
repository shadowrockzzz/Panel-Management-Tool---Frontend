import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSlotAdditionComponent } from './panel-slot-addition.component';

describe('PanelSlotAdditionComponent', () => {
  let component: PanelSlotAdditionComponent;
  let fixture: ComponentFixture<PanelSlotAdditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelSlotAdditionComponent]
    });
    fixture = TestBed.createComponent(PanelSlotAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
