import * as dom from "./dom";
import { draw_mode } from "./draw_mode";
import { draw_module_rounded } from "./draw_rounded";

const draw_background = (ctx: any, settings: any) => {
  if (settings.back) {
    ctx.fillStyle = settings.back;
    ctx.fillRect(0, 0, settings.size, settings.size);
  }
};

const draw_module_default = (
  qr: any,
  ctx: any,
  settings: any,
  width: any,
  row: any,
  col: any
) => {
  if (qr.is_dark(row, col)) {
    ctx.rect(col * width, row * width, width, width);
  }
};

export const draw_modules = (qr: any, ctx: any, settings: any) => {
  if (!qr) {
    return;
  }

  const draw_module =
    settings.rounded > 0 && settings.rounded <= 100
      ? draw_module_rounded
      : draw_module_default;
  const mod_count = qr.module_count;

  let mod_size = settings.size / mod_count;
  let offset = 0;
  if (settings.crisp) {
    mod_size = Math.floor(mod_size);
    offset = Math.floor((settings.size - mod_size * mod_count) / 2);
  }

  ctx.translate(offset, offset);
  ctx.beginPath();
  for (let row = 0; row < mod_count; row += 1) {
    for (let col = 0; col < mod_count; col += 1) {
      draw_module(qr, ctx, settings, mod_size, row, col);
    }
  }
  ctx.fillStyle = settings.fill;
  ctx.fill();
  ctx.translate(-offset, -offset);
};

const draw = (qr: any, ctx: any, settings: any) => {
  draw_background(ctx, settings);
  draw_modules(qr, ctx, settings);
  draw_mode(ctx, settings);
};

export const create_canvas_qrcode = (qr: any, settings: any, as_image: any) => {
  const ratio = settings.ratio || dom.dpr;
  const canvas = dom.create_canvas(settings.size, ratio);
  const context = canvas.getContext("2d");

  if (settings.imageAsCode) {
    const canvas = dom.create_canvas(settings.size, ratio);
    const ctx2 = canvas.getContext("2d");
    draw_modules(qr, ctx2, settings);
    const imagePos = dom.calc_image_pos(settings);
    ctx2.globalCompositeOperation = "source-in";
    ctx2.drawImage(
      settings.image,
      imagePos.x,
      imagePos.y,
      imagePos.iw,
      imagePos.ih
    );
    settings = Object.assign({}, settings, { image: ctx2.canvas });
  }

  context.scale(ratio, ratio);
  draw(qr, context, settings);
  return as_image ? dom.canvas_to_img(canvas, settings.elementId) : canvas;
};
