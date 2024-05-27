import { create_canvas_qrcode } from "./lib/create_canvas_qrcode";
import { create_svg_qrcode } from "./lib/create_svg_qrcode";
import { defaults } from "./lib/defaults";
import { quiet_qrcode } from "./lib/qrcode";

export const kjua = (options: any): any => {
  const settings = Object.assign({}, defaults, options);
  const qr = quiet_qrcode(
    settings.text,
    settings.ecLevel,
    settings.minVersion,
    settings.quiet
  );

  if (typeof settings.image === "string") {
    const image = new Image();
    image.src = "data:image/png;base64," + settings.image;
    image.crossOrigin = "anonymous";
    settings.image = image;
  }
  if (settings.render === "svg") {
    return create_svg_qrcode(qr, settings);
  }
  return create_canvas_qrcode(qr, settings, settings.render === "image");
};
