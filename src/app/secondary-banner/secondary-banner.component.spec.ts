import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryBannerComponent } from './secondary-banner.component';

describe('SecondaryBannerComponent', () => {
  let component: SecondaryBannerComponent;
  let fixture: ComponentFixture<SecondaryBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
