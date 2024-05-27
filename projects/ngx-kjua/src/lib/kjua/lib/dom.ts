const win = window; // eslint-disable-line no-undef
const doc = win.document;
export const dpr = win.devicePixelRatio || 1;

export const SVG_NS = "http://www.w3.org/2000/svg";

export const get_attr = (el: any, key: any) => el.getAttribute(key);
export const set_attrs = (el: any, obj: any) => {
  Object.keys(obj || {}).forEach((key) => {
    el.setAttribute(key, obj[key]);
  });
  return el;
};

export const create_el = (name: any, obj: any) =>
  set_attrs(doc.createElement(name), obj);
export const create_svg_el = (name: any, obj: any) =>
  set_attrs(doc.createElementNS(SVG_NS, name), obj);

export const create_canvas = (size: any, ratio: any) => {
  const canvas = create_el("canvas", {
    width: size * ratio,
    height: size * ratio,
  });
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  return canvas;
};

export const canvas_to_img = (canvas: any, elementId: any) => {
  const img = create_el("img", {
    crossOrigin: "anonymous",
    src: canvas.toDataURL("image/png"),
    width: get_attr(canvas, "width"),
    height: get_attr(canvas, "height"),
    id: elementId,
  });
  img.style.width = canvas.style.width;
  img.style.height = canvas.style.height;
  return img;
};

export const calc_image_pos = (settings: any) => {
  let mSize = settings.mSize;
  let mPosX = settings.mPosX;
  let mPosY = settings.mPosY;
  let arrayPos = 0;
  if (settings.mode === "labelimage") {
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
  const w = settings.image.naturalWidth || 1;
  const h = settings.image.naturalHeight || 1;
  const sh = mSize * 0.01;
  const sw = (sh * w) / h;
  const sl = (1 - sw) * mPosX * 0.01;
  const st = (1 - sh) * mPosY * 0.01;
  const x = sl * size;
  const y = st * size;
  const iw = sw * size;
  const ih = sh * size;
  return { x, y, iw, ih };
};
