import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {

  text = "https://github.com/werthdavid/ngx-kjua";
  render = "image";
  crisp = true;
  minVersion = 1;
  ecLevel = "H";
  size = 400;
  ratio = undefined;
  fill = "#333333";
  back = "#ffffff";
  rounded = 0;
  quiet = 1;
  mode = "label";
  mSize = 30;
  mPosX = 50;
  mPosY = 50;
  label = "kjua";
  fontname = "sans-serif";
  fontcolor = "#ff9818";
  image = undefined;
  imageText = "";
  imageAsCode = false;

  @ViewChild("imgBuffer")
  imageElement: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => this.image = this.imageElement.nativeElement, 500);
  }

  /**
   * Not perfect, I know
   * @param event
   */
  getFiles(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event2: any) => { // called once readAsDataURL is completed
        this.imageElement.nativeElement.src = event2.target.result;
        this.image = this.imageElement.nativeElement;
      }
    }
  }
}
