import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameComponent } from './start-game-component';

describe('StartScreenComponent', () => {
  let component: StartGameComponent;
  let fixture: ComponentFixture<StartGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
