import { draw_modules } from "./create_canvas_qrcode";
import {
  SVG_NS,
  calc_image_pos,
  create_canvas,
  create_svg_el,
  dpr,
  get_attr,
} from "./dom";

const create_draw_ctx = (ctx: any) => {
  const rnd = (x: any) => Math.round(x * 10) / 10;
  const rndo = (x: any) => Math.round(x * 10) / 10 + ctx.o;
  return {
    m(x: any, y: any) {
      ctx.p += `M ${rndo(x)} ${rndo(y)} `;
      return this;
    },
    l(x: any, y: any) {
      ctx.p += `L ${rndo(x)} ${rndo(y)} `;
      return this;
    },
    a(x: any, y: any, rad: any) {
      ctx.p += `A ${rnd(rad)} ${rnd(rad)} 0 0 1 ${rndo(x)} ${rndo(y)} `;
      return this;
    },
  };
};

const draw_dark = (
  ctx: any,
  l: any,
  t: any,
  r: any,
  b: any,
  rad: any,
  nw: any,
  ne: any,
  se: any,
  sw: any
) => {
  if (nw) {
    ctx.m(l + rad, t);
  } else {
    ctx.m(l, t);
  }

  if (ne) {
    ctx.l(r - rad, t).a(r, t + rad, rad);
  } else {
    ctx.l(r, t);
  }

  if (se) {
    ctx.l(r, b - rad).a(r - rad, b, rad);
  } else {
    ctx.l(r, b);
  }

  if (sw) {
    ctx.l(l + rad, b).a(l, b - rad, rad);
  } else {
    ctx.l(l, b);
  }

  if (nw) {
    ctx.l(l, t + rad).a(l + rad, t, rad);
  } else {
    ctx.l(l, t);
  }
};

const draw_light = (
  ctx: any,
  l: any,
  t: any,
  r: any,
  b: any,
  rad: any,
  nw: any,
  ne: any,
  se: any,
  sw: any
) => {
  if (nw) {
    ctx
      .m(l + rad, t)
      .l(l, t)
      .l(l, t + rad)
      .a(l + rad, t, rad);
  }

  if (ne) {
    ctx
      .m(r, t + rad)
      .l(r, t)
      .l(r - rad, t)
      .a(r, t + rad, rad);
  }

  if (se) {
    ctx
      .m(r - rad, b)
      .l(r, b)
      .l(r, b - rad)
      .a(r - rad, b, rad);
  }

  if (sw) {
    ctx
      .m(l, b - rad)
      .l(l, b)
      .l(l + rad, b)
      .a(l, b - rad, rad);
  }
};

const draw_mod = (
  qr: any,
  ctx: any,
  settings: any,
  width: any,
  row: any,
  col: any
) => {
  const left = col * width;
  const top = row * width;
  const right = left + width;
  const bottom = top + width;
  const radius = settings.rounded * 0.005 * width;

  const is_dark = qr.is_dark;
  const row_n = row - 1;
  const row_s = row + 1;
  const col_w = col - 1;
  const col_e = col + 1;
  const dark_center = is_dark(row, col);
  const dark_nw = is_dark(row_n, col_w);
  const dark_n = is_dark(row_n, col);
  const dark_ne = is_dark(row_n, col_e);
  const dark_e = is_dark(row, col_e);
  const dark_se = is_dark(row_s, col_e);
  const dark_s = is_dark(row_s, col);
  const dark_sw = is_dark(row_s, col_w);
  const dark_w = is_dark(row, col_w);

  if (dark_center) {
    draw_dark(
      ctx,
      left,
      top,
      right,
      bottom,
      radius,
      !dark_n && !dark_w,
      !dark_n && !dark_e,
      !dark_s && !dark_e,
      !dark_s && !dark_w
    );
  } else {
    draw_light(
      ctx,
      left,
      top,
      right,
      bottom,
      radius,
      dark_n && dark_w && dark_nw,
      dark_n && dark_e && dark_ne,
      dark_s && dark_e && dark_se,
      dark_s && dark_w && dark_sw
    );
  }
};

const create_path = (qr: any, settings: any) => {
  if (!qr) {
    return "";
  }

  const ctx = { p: "", o: 0 };
  const mod_count = qr.module_count;
  let mod_size = settings.size / mod_count;
  if (settings.crisp) {
    mod_size = Math.floor(mod_size);
    ctx.o = Math.floor((settings.size - mod_size * mod_count) / 2);
  }

  const draw_ctx = create_draw_ctx(ctx);
  for (let row = 0; row < mod_count; row += 1) {
    for (let col = 0; col < mod_count; col += 1) {
      draw_mod(qr, draw_ctx, settings, mod_size, row, col);
    }
  }

  return ctx.p;
};

const add_label = (el: any, settings: any) => {
  let mSize = settings.mSize;
  let mPosX = settings.mPosX;
  let mPosY = settings.mPosY;
  let arrayPos = 0;
  if (settings.mode === "imagelabel") {
    arrayPos = 1;
  }
  if (Array.isArray(settings.mSize)) {
    mSize = settings.mSize[arrayPos];
  }
  if (Array.isArray(settings.mPosX)) {
    mPosX = settings.mPosX[arrayPos];
  }
  if (Array.isArray(settings.mPosY)) {
    mPosY = settings.mPosY[arrayPos];
  }

  const size = settings.size;
  const font = "bold " + mSize * 0.01 * size + "px " + settings.fontname;

  const ratio = settings.ratio || dpr;
  const ctx = create_canvas(size, ratio).getContext("2d");
  ctx.strokeStyle = settings.back;
  ctx.lineWidth = mSize * 0.01 * size * 0.1;
  ctx.fillStyle = settings.fontcolor;
  ctx.font = font;
  const w = ctx.measureText(settings.label).width;

  const sh = mSize * 0.01;
  const sw = w / size;
  const sl = (1 - sw) * mPosX * 0.01;
  const st = (1 - sh) * mPosY * 0.01;
  const x = sl * size;
  const y = st * size + 0.75 * mSize * 0.01 * size;

  const text_el = create_svg_el("text", {
    x,
    y,
  });
  Object.assign(text_el.style, {
    font,
    fill: settings.fontcolor,
    "paint-order": "stroke",
    stroke: settings.back,
    "stroke-width": ctx.lineWidth,
  });

  text_el.textContent = settings.label;
  el.appendChild(text_el);
};

const add_image = (el: any, settings: any) => {
  let img_el;
  if (settings.imageAsCode) {
    img_el = create_svg_el("image", {
      href: settings.image,
      x: 0,
      y: 0,
      width: settings.size,
      height: settings.size,
    });
  } else {
    const imagePos = calc_image_pos(settings);
    img_el = create_svg_el("image", {
      href: settings.image,
      x: imagePos.x,
      y: imagePos.y,
      width: imagePos.iw,
      height: imagePos.ih,
    });
  }
  el.appendChild(img_el);
};

export const create_svg_qrcode = (qr: any, settings: any) => {
  const size = settings.size;
  const mode = settings.mode;

  const svg_el = create_svg_el("svg", {
    xmlns: SVG_NS,
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
  });
  svg_el.style.width = `${size}px`;
  svg_el.style.height = `${size}px`;
  svg_el.setAttribute("title", settings.text);
  if (!!settings.elementId) {
    svg_el.setAttribute("id", settings.elementId);
  }

  if (settings.back) {
    svg_el.appendChild(
      create_svg_el("rect", {
        x: 0,
        y: 0,
        width: size,
        height: size,
        fill: settings.back,
      })
    );
  }

  svg_el.appendChild(
    create_svg_el("path", {
      d: create_path(qr, settings),
      fill: settings.fill,
    })
  );

  if (settings.image) {
    if (settings.imageAsCode) {
      const ratio = settings.ratio || dpr;
      const canvas = create_canvas(settings.size, ratio);
      const ctx2 = canvas.getContext("2d");
      draw_modules(qr, ctx2, settings);
      const imagePos = calc_image_pos(settings);
      ctx2.globalCompositeOperation = "source-in";
      ctx2.drawImage(
        settings.image,
        imagePos.x,
        imagePos.y,
        imagePos.iw,
        imagePos.ih
      );
      settings = Object.assign({}, settings, {
        image: ctx2.canvas.toDataURL(),
      });
    } else {
      settings = Object.assign({}, settings, {
        image: get_attr(settings.image, "src"),
      });
    }
  }
  if (mode === "label") {
    add_label(svg_el, settings);
  } else if (mode === "image") {
    add_image(svg_el, settings);
  } else if (mode === "labelimage") {
    add_label(svg_el, settings);
    add_image(svg_el, settings);
  } else if (mode === "imagelabel") {
    add_image(svg_el, settings);
    add_label(svg_el, settings);
  }

  return svg_el;
};
