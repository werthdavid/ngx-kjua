import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild,} from "@angular/core";

import {isPlatformServer} from "@angular/common";

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
export class NgxKjuaComponent implements OnInit, OnChanges {

  /**
   * render method: "canvas" or "image" or "svg"
   */
  @Input()
  render = "image";

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
   * error correction level= "L"; "M"; "Q" or "H"
   */
  @Input()
  ecLevel = "L";

  /**
   * size in pixel
   */
  @Input()
  size = 200;

  /**
   * pixel-ratio; undefined for devicePixelRatio
   */
  @Input()
  ratio = undefined;

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
   * modes= "plain"; "label" or "image"
   */
  @Input()
  mode = "plain";

  /**
   * label/image size and pos in pc= 0..100
   */
  @Input()
  mSize = 30;
  @Input()
  mPosX = 50;
  @Input()
  mPosY = 50;

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
  image = undefined;

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
  cssClass;

  @ViewChild("elem")
  div;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformServer(this.platformId)) {
      return;
    } else if (!kjua) {
      kjua = require("kjua-svg");
    }
  }

  ngOnInit(): void {
    this.updateView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateView();
  }

  get template() {
    const settings = {
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
      image: this.image
    };
    console.debug("kjua settings used:", settings);
    return kjua(settings);
  }

  renderCode() {
    if (this.render === "image") {
      this.div.nativeElement.innerHTML = this.template.outerHTML;
    } else {
      this.div.nativeElement.innerHTML = "";
      this.div.nativeElement.appendChild(this.template);
    }
  }

  updateView() {
    this.div.nativeElement.style.width = +this.size;
    this.div.nativeElement.style.height = +this.size;
    if (this.renderAsync) {
      requestAnimationFrame(() => this.renderCode());
    } else {
      this.renderCode();
    }
  }
}
