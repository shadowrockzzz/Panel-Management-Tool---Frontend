import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSetupComponent } from './panel-setup.component';

describe('PanelSetupComponent', () => {
  let component: PanelSetupComponent;
  let fixture: ComponentFixture<PanelSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelSetupComponent]
    });
    fixture = TestBed.createComponent(PanelSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
