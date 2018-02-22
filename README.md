[![NPM version](https://img.shields.io/npm/v/ngx-kjua.svg?&label=npm)](https://www.npmjs.com/package/ngx-kjua) 
[![Downloads](https://img.shields.io/npm/dm/ngx-kjua.svg)](https://npmjs.org/package/ngx-kjua)
[![Dependency Status](https://david-dm.org/werthdavid/ngx-kjua.svg)](https://david-dm.org/werthdavid/ngx-kjua)
<img align="right" src="https://raw.githubusercontent.com/werthdavid/ngx-kjua/master/docs/readme-logo.png"/>

# ngx-kjua

> Angular QR-Code generator component.

This is basically an Angular-wrapper for [kjua](https://github.com/lrsjng/kjua) by Lars Jung.

## Demo

[Plunkr](https://plnkr.co/edit/rK8yZ03sQDdJqOKdXaGR?p=preview) _(preview needs to be opened in new window)_

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
        
        // ZXing scanner module
        NgxKjuaModule.forRoot(),
        
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

* `start` used to start and stop the scanning (defaults to `false`)
* `device` is the video-device used for scanning (use one of the devices emitted by `onCamsFound`)
* `cssClass` this CSS-class name will be appended to the video-element e.g. for resizing it (see below)
* `onCamsFound` will emit an array of video-devices after view was initialized
* `onScan` will emit the result as string, after a valid QR-Code was scanned


More details can be found on [larsjung.de/kjua](https://larsjung.de/kjua/)
