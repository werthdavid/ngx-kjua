[![NPM version](https://img.shields.io/npm/v/ngx-kjua.svg?&label=npm)](https://www.npmjs.com/package/ngx-kjua) 
[![Downloads](https://img.shields.io/npm/dm/ngx-kjua.svg)](https://npmjs.org/package/ngx-kjua)
[![Dependency Status](https://david-dm.org/werthdavid/ngx-kjua.svg)](https://david-dm.org/werthdavid/ngx-kjua)
<img align="right" src="https://raw.githubusercontent.com/werthdavid/ngx-kjua/master/docs/readme-logo.png"/>

# ngx-kjua

> Angular QR-Code generator component.

This is basically an Angular-wrapper for [kjua](https://github.com/lrsjng/kjua) by Lars Jung.

## Demo

[Demo](https://werthdavid.github.io/ngx-kjua/index.html)

[StackBlitz](https://stackblitz.com/edit/ngx-kjua-example?file=index.html) 

[StackBlitz](https://stackblitz.com/edit/ngx-kjua-batch?file=app/app.component.html) Example with 300 codes at once (async rendering)

[StackBlitz](https://stackblitz.com/edit/ngx-kjua-batch-jspdf?file=app%2Fapp.component.ts) Example for generating a PDF with [jspdf](https://github.com/MrRio/jsPDF)

## Installation

To install this package, run:

```bash
npm install ngx-kjua --save
```

Then import it into your Angular `AppModule`:

```typescript
// Common imports
import { NgModule /* , ... */ } from '@angular/core';

// Import the package's module
import { NgxKjuaModule } from 'ngx-kjua';

@NgModule({
    declarations: [ /* AppComponent ... */ ],
    imports: [
    
        // BrowserModule, 
        // ...
        
        NgxKjuaModule,
        
        // another imports...
    ],
    // ...
})
export class AppModule { }
```

## Usage

Once the package is imported, you can use it in your Angular application:

```html
  <ngx-kjua
    [text]="'hello'"
    [renderAsync]="false"
    [render]="'image'"
    [crisp]="true"
    [minVersion]="1"
    [ecLevel]="'H'"
    [size]="400"
    [ratio]="undefined"
    [fill]="'#333'"
    [back]="'#fff'"
    [rounded]="100"
    [quiet]="1"
    [mode]="'plain'"
    [mSize]="30"
    [mPosX]="50"
    [mPosY]="50"
    [label]="'label text'"
    [fontname]="'sans-serif'"
    [fontcolor]="'#ff9818'"
    [image]="undefined"
  ></ngx-kjua>
```

* `text` encoded content (defaults to ``)
* `renderAsync` weather or not rendering is done inside "requestAnimationFrame"-call (defaults to `false`, use true if you want to generate more than one code (e.g. batch))
* `render` render pixel-perfect lines (defaults to `true`)
* `minVersion` minimum version: 1..40(defaults to `1`)
* `ecLevel` error correction level: 'L', 'M', 'Q' or 'H' (defaults to `L`)
* `size` size in pixel (defaults to `200`)
* `fill` code color (defaults to `#333`)
* `back` background color (defaults to `#fff`)
* `rounded` roundend corners in pc: 0..100 (defaults to `0`)
* `quiet` quiet zone in modules (defaults to `0`)
* `mode` modes: 'plain', 'label' or 'image' (defaults to `plain`, set `label` or `image` property if you change this)
* `mSize` label/image size in pc: 0..100 (defaults to `30`)
* `mPosX` label/image pos x in pc: 0..100 (defaults to `50`)
* `mPosY` label/image pos y in pc: 0..100 (defaults to `50`)
* `label` additional label text (defaults to ``)
* `fontname` font for additional label text (defaults to `sans-serif`)
* `fontcolor` font-color for additional label text (defaults to `#333`)
* `image` additional image (defaults to `undefined`, use an HTMLImageElement)

More details can be found on [larsjung.de/kjua](https://larsjung.de/kjua/)

### Async rendering

If you plan to render more than one barcode (e.g. batch-generation) I recommend using `renderAsync`-flag. It executes the rendering inside a "requestAnimationFrame"-call.

### Generate PDF

See the [example](https://stackblitz.com/edit/ngx-kjua-batch-jspdf?file=app%2Fapp.component.ts) above. 
It works with pure kjua and has in fact nothing to do with ngx-kjua but I thought somebody might find it useful.

## Todo

* Add a helper class that lets users create VCards, Calendar entries, Wifi-settings, ...
