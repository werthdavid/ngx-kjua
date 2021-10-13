import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  EventEmitter
} from "@angular/core";

import {isPlatformServer} from "@angular/common";
import {KjuaOptions} from "kjua-svg";

// Because kjua uses `window` and `document` directly, we cannot `import` during SSR
// instead, we load dynamically via `require('kjua')` in `ngAfterViewInit()`
declare var require: any;
let kjua: any;

@Component({
  selector: "ngx-kjua",
  template: `
    <div [class]="cssClass" #elem></div>`,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxKjuaComponent implements AfterViewInit, OnChanges {

  /**
   * render method
   */
  @Input()
  render: "image" | "svg" | "canvas" = "svg";

  /**
   * render pixel-perfect lines
   */
  @Input()
  crisp = true;

  /**
   * minimum version= 1..40
   */
  @Input()
  minVersion = 1;

  /**
   * error correction level
   */
  @Input()
  ecLevel: "L" | "M" | "Q" | "H" = "L";

  /**
   * size in pixel
   */
  @Input()
  size = 200;

  /**
   * pixel-ratio; undefined for devicePixelRatio
   */
  @Input()
  ratio: number | null = undefined;

  /**
   * code color
   */
  @Input()
  fill = "#333";

  /**
   * background color
   */
  @Input()
  back = "#fff";

  /**
   * content
   */
  @Input()
  text = "";

  /**
   * roundend corners in pc= 0..100
   */
  @Input()
  rounded = 0;

  /**
   * quiet zone in modules
   */
  @Input()
  quiet = 0;

  /**
   * modes
   */
  @Input()
  mode: "plain" | "label" | "image" | "imagelabel" | "labelimage" = "plain";

  /**
   * label/image size and pos in pc= 0..100
   */
  @Input()
  mSize: number|number[] = 30;
  @Input()
  mPosX: number|number[] = 50;
  @Input()
  mPosY: number|number[] = 50;
  @Input()
  image: null | HTMLImageElement | string = undefined;
  @Input()
  imageAsCode = false;

  /**
   * label
   */
  @Input()
  label = "";
  @Input()
  fontname = "sans-serif";
  @Input()
  fontcolor = "#333";
  @Input()
  fontoutline = true;

  /**
   * If true, rendering is done inside "requestAnimationFrame"-call.
   * Use this if you want to generate more than one code (e.g. batch)
   */
  @Input()
  renderAsync = false;

  /**
   * If set, this css-class will be appended to the div-container that contains
   * the qr-code (which is either an img or a canvas)
   */
  @Input()
  cssClass: string;

  /**
   * an optional HTML-ID-attribute for the element (works only with render-mode SVG and image)
   */
  @Input()
  elementId: string;

  @Output()
  codeFinished = new EventEmitter<any>();

  @ViewChild("elem")
  div;

  private viewInitialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformServer(this.platformId)) {
      return;
    } else if (!kjua) {
      kjua = require("kjua-svg");
    }
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.updateView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.viewInitialized) {
      this.updateView();
    }
  }

  get template(): Node {
    const settings: KjuaOptions = {
      render: this.render,
      crisp: this.crisp,
      minVersion: this.minVersion,
      ecLevel: this.ecLevel,
      size: this.size,
      ratio: this.ratio,
      fill: this.fill,
      back: this.back,
      text: this.text,
      rounded: this.rounded,
      quiet: this.quiet,
      mode: this.mode,
      mSize: this.mSize,
      mPosX: this.mPosX,
      mPosY: this.mPosY,
      label: this.label,
      fontname: this.fontname,
      fontcolor: this.fontcolor,
      image: this.image,
      fontoutline: this.fontoutline,
      imageAsCode: this.imageAsCode,
      elementId: this.elementId
    };
    return kjua(settings);
  }

  renderCode() {
    this.div.nativeElement.innerHTML = "";
    const node = this.template;
    this.div.nativeElement.appendChild(node);
    this.codeFinished.next(node);
  }

  updateView() {
    this.div.nativeElement.style.width = +this.size;
    this.div.nativeElement.style.height = +this.size;
    if (typeof this.image === "string") {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (this.renderAsync) {
          requestAnimationFrame(() => this.renderCode());
        } else {
          this.renderCode();
        }
      }
      img.src = 'data:image/png;base64,' + this.image;
    } else {
      if (this.renderAsync) {
        requestAnimationFrame(() => this.renderCode());
      } else {
        this.renderCode();
      }
    }
  }
}
