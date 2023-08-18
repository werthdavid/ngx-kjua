import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxKjuaComponent } from './ngx-kjua.component';

describe('NgxKjuaComponent', () => {
  let component: NgxKjuaComponent;
  let fixture: ComponentFixture<NgxKjuaComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NgxKjuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxKjuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
