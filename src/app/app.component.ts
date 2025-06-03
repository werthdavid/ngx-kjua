import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import {
  KjuaEcLevel,
  KjuaMode,
  KjuaRender,
} from "../../projects/ngx-kjua/src/lib/ngx-kjua.interface";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    standalone: false
})
export class AppComponent implements AfterViewInit {
  text: string | any = "https://github.com/werthdavid/ngx-kjua";
  render: KjuaRender = "svg";
  crisp = true;
  minVersion = 1;
  ecLevel: KjuaEcLevel = "H";
  size = 400;
  ratio = undefined;
  fill = "#333333";
  back = "transparent";
  rounded = 0;
  quiet = 1;
  mode: KjuaMode = "label";
  mSize = 30;
  mPosX = 50;
  mPosY = 50;
  mSize2 = 30;
  mPosX2 = 50;
  mPosY2 = 50;
  label = "kjua";
  fontname = "Ubuntu";
  fontcolor = "#ff9818";
  fontoutline = true;
  imageAsCode = false;
  imageText = "";
  imgNativeElement = undefined;
  elementId = "";

  @ViewChild("imgBuffer")
  imageElement!: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(
      () => (this.imgNativeElement = this.imageElement.nativeElement),
      500
    );
  }

  /**
   * Not perfect, I know
   * @param event
   */
  getFiles(event: any) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event2: any) => {
        // called once readAsDataURL is completed
        this.imageElement.nativeElement.src = event2.target.result;
        this.imgNativeElement = this.imageElement.nativeElement;
      };
    }
  }

  get image() {
    if (!!this.imageText && this.imageText.length > 0) {
      return this.imageText;
    } else {
      return this.imgNativeElement;
    }
  }
}
