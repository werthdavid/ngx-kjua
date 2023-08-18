import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgxKjuaComponent } from "../../projects/ngx-kjua/src/lib/ngx-kjua.component";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Child
    NgxKjuaComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
