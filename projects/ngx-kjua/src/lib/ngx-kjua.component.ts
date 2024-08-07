import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  booleanAttribute,
} from "@angular/core";
import {kjua} from "./kjua/index";
import {KjuaEcLevel, KjuaMode, KjuaRender} from "./ngx-kjua.interface";
import {KjuaOptions} from "./kjua/lib/kjua-options";

@Component({
  standalone: true,
  selector: "ngx-kjua",
  template: `<div [class]="cssClass" #elem></div>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxKjuaComponent implements AfterViewInit, OnChanges {
  /**
   * render method
   */
  @Input()
  render: KjuaRender = "svg";

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
  ecLevel: KjuaEcLevel = "L";

  /**
   * size in pixel
   */

  @Input() size: string | number = 200;

  /**
   * pixel-ratio; undefined for devicePixelRatio
   */
  @Input()
  ratio: number | null | undefined = undefined;

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
  private _text = "";
  @Input() set text(value: any) {
    if (String(value)) this._text = value;
    else if (Number(value)) this._text = value.toString();
    else this._text = "";
  }

  /**
   * rounded corners in pc= 0..100
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
  mode: KjuaMode = "plain";

  /**
   * label/image size and pos in pc= 0..100
   */
  @Input()
  mSize: number | number[] = 30;
  @Input()
  mPosX: number | number[] = 50;
  @Input()
  mPosY: number | number[] = 50;
  @Input()
  image: null | undefined | HTMLImageElement | string = undefined;
  @Input({ transform: booleanAttribute })
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
  @Input({ transform: booleanAttribute })
  renderAsync = false;

  /**
   * If set, this css-class will be appended to the div-container that contains
   * the qr-code (which is either an img or a canvas)
   */
  @Input()
  cssClass: string | undefined;

  /**
   * an optional HTML-ID-attribute for the element (works only with render-mode SVG and image)
   */
  @Input()
  elementId: string | undefined;

  @Output()
  codeFinished = new EventEmitter<any>();

  @ViewChild("elem", { static: true }) div!: ElementRef<HTMLElement>;

  private viewInitialized = false;

  constructor() {}

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.updateView();
  }

  ngOnChanges(_changes: SimpleChanges): void {
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
      size: +this.size,
      ratio: this.ratio,
      fill: this.fill,
      back: this.back,
      text: this._text,
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
      elementId: this.elementId,
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
    this.div.nativeElement.style.width = this.size.toString() + "px";
    this.div.nativeElement.style.height = this.size.toString() + "px";

    if (typeof this.image === "string") {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (this.renderAsync) {
          requestAnimationFrame(() => this.renderCode());
        } else {
          this.renderCode();
        }
      };
      img.src = "data:image/png;base64," + this.image;
    } else {
      if (this.renderAsync) {
        requestAnimationFrame(() => this.renderCode());
      } else {
        this.renderCode();
      }
    }
  }
}
