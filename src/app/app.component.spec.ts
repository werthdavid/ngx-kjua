import {async, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {NgxKjuaModule} from "./modules/ngx-kjua/ngx-kjua.module";
import {FormsModule} from "@angular/forms";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NgxKjuaModule,
        FormsModule
      ]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
