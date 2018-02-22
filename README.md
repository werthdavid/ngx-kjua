[![NPM version](https://img.shields.io/npm/v/ngx-kjua.svg?&label=npm)](https://www.npmjs.com/package/ngx-kjua) 
[![Downloads](https://img.shields.io/npm/dm/ngx-kjua.svg)](https://npmjs.org/package/ngx-kjua)
[![Dependency Status](https://david-dm.org/werthdavid/ngx-kjua.svg)](https://david-dm.org/werthdavid/ngx-kjua)
<img align="right" src="https://raw.githubusercontent.com/werthdavid/ngx-kjua/master/docs/readme-logo.png"/>

# ngx-kjua

> Angular QR-Code generator component.

This is basically an Angular-wrapper for [kjua](https://github.com/lrsjng/kjua) by Lars Jung.

## Demo

[StackBlitz](https://stackblitz.com/edit/ngx-kjua-example?file=index.html) _(preview needs to be opened in new window)_

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
    [renderAsync]="false"
  ></ngx-kjua>
```

* `text` encoded content (defaults to ``)
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
