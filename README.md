[![NPM version](https://img.shields.io/npm/v/ngx-kjua.svg?&label=npm)](https://www.npmjs.com/package/ngx-kjua) 
[![Dependency Status](https://david-dm.org/werthdavid/ngx-kjua.svg)](https://david-dm.org/werthdavid/ngx-kjua)
[![Downloads](https://img.shields.io/npm/dm/ngx-kjua.svg)](https://npmjs.org/package/ngx-kjua)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2ef6c180329a44cc9fd95abc77fc8c1d)](https://www.codacy.com/app/werthdavid/ngx-kjua?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=werthdavid/ngx-kjua&amp;utm_campaign=Badge_Grade)
<img align="right" src="https://raw.githubusercontent.com/werthdavid/ngx-kjua/master/docs/readme-logo.png"/>

If you find my work useful you can buy me a coffee, I am very thankful for your support. 

<a href="https://www.buymeacoffee.com/werthdavid" target="_blank"><img width="140" src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee"></a>


# ngx-kjua

> Angular QR-Code generator component.

This is basically an Angular-wrapper for [kjua](https://github.com/lrsjng/kjua) by Lars Jung.

## Demo

<img src="https://raw.githubusercontent.com/werthdavid/ngx-kjua/master/docs/demo.png"/>

[Demo](https://werthdavid.github.io/ngx-kjua/index.html)

[StackBlitz](https://stackblitz.com/edit/ngx-kjua-example-7) 

[StackBlitz](https://stackblitz.com/edit/ngx-kjua-helper?file=app/app.component.ts) Example for encoding Contacts, Calendar entries, WiFi-settings and more. You can use iPhone's default Camera App, it will decode QR-Codes!

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
        
        // other imports...
    ],
    // ...
})
export class AppModule { }
```

## Usage

Once the package is imported, you can use it in your Angular application:

### Basic

```html
  <ngx-kjua
    [text]="'hello'"
  ></ngx-kjua>
```

### Advanced

```html
  <ngx-kjua
    [text]="'hello'"
    [renderAsync]="false"
    [render]="'svg'"
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
    [cssClass]="'image-auto'"
  ></ngx-kjua>
```

## Options

### Crisp

As you can set the size of the image, the amount of 'modules' (black/white boxes that make up the QR-code) is calculated based on the size and the amount of `quiet` modules. The calculation can result in an odd number so that a module is e.g. 4.5 pixels big. The resulting image will be drawn fuzzy if `crisp` is set to false. Setting it to `true` will result in 'sharp' lines.

#### crisp false
<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/no-crisp.jpg"/>

#### crisp true
<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/crisp.jpg"/>


### Label
Kjua lets you embed a text or image to the code. This can be set with the setting `mode`.
This can reduce the readability of the code!

### Image
<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/image.png"/>

### Image as Code
<img src="https://raw.githubusercontent.com/werthdavid/kjua/master/docs/image-as-code.png"/>

### Labelimage and Imagelabel
Use this, if you want a label AND an image. In these modes `mSize`, `mPosX` and `mPosY` can be provided as an array.
In mode `labelimage`, the first value (index 0) of the `mSize`, `mPosX` and `mPosY` arrays is used for the label,
the second value (index 1) is used for image and vice versa. Also in `labelimage` mode, the label is drawn before the 
image is drawn and therefore kinda "in the background" if the two overlap.

### All options

* `text` encoded content (defaults to ``)
* `render` render-mode: 'image', 'canvas', 'svg' (defaults to `image`)
* `crisp` render pixel-perfect lines (defaults to `true`)
* `minVersion` minimum version: 1..40 (defaults to `1`)
* `ecLevel` error correction level: 'L', 'M', 'Q' or 'H' (defaults to `L`)
* `size` size in pixel (defaults to `200`, min `24` or higher, depend on how much character you're using)
* `fill` code color (defaults to `#333`)
* `back` background color (defaults to `#fff`, for transparent use `''` or `null`)
* `rounded` roundend corners in pc: 0..100 (defaults to `0`, not working if `render`is set to `svg`)
* `quiet` quiet zone in modules (defaults to `0`)
* `mode` modes: 'plain', 'label' or 'image' (defaults to `plain`, set `label` or `image` property if you change this)
* `mSize` label/image size in pc: 0..100 (defaults to `30`)
* `mPosX` label/image pos x in pc: 0..100 (defaults to `50`)
* `mPosY` label/image pos y in pc: 0..100 (defaults to `50`)
* `label` additional label text (defaults to ``)
* `fontname` font for additional label text (defaults to `sans-serif`)
* `fontcolor` font-color for additional label text (defaults to `#333`)
* `fontoutline` draw an outline on the label text in the color of the `back` (defaults to `true`)
* `image` additional image (defaults to `undefined`, use an HTMLImageElement or base64-string)
* `imageAsCode` draw the image as part of the code (defaults to `false`)
* `renderAsync` weather or not rendering is done inside "requestAnimationFrame"-call (defaults to `false`, use true if you want to generate more than one code (e.g. batch))
* `cssClass` additional css-class that will be appended to the div-container that contains the qr-code (defaults to `undefined`)

More details can be found on [larsjung.de/kjua](https://larsjung.de/kjua/)

### Async rendering

If you plan to render more than one barcode (e.g. batch-generation) I recommend using `renderAsync`-flag. It executes the rendering inside a "requestAnimationFrame"-call.

### Encoding Contacts, Calendar entries, WiFi-settings, ...

The component comes with a helper-class (`QrCodeHelper`), that helps you with generating Codes that have information like a Contact encoded.
Currently it supports the generation of:

* SMS: number with optional pre-defined text
* Call
* Geo-Information: a point on the map with Latitude and Longitude
* Events
* Email: recipient with an optional subject and text
* WiFi: SSID with optional password and a flag for hidden WiFis
* Contact Information: name with optional address, telephone-number(s), email, url.

Contact Encoding is done with MECard-format and NOT VCard! VCard gives a longer string and therefore a
bigger code which potentially has a negative impact on readability for scanners. 
You can, of course, create a [VCard](https://en.wikipedia.org/wiki/VCard) string as well but the format is more complex.

### Generate PDF

See the [example](https://stackblitz.com/edit/ngx-kjua-batch-jspdf?file=app%2Fapp.component.ts) above. 
It works with pure kjua and has in fact nothing to do with ngx-kjua but I thought somebody might find it useful.

