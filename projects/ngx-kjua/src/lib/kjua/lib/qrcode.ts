const RE_CODE_LENGTH_OVERFLOW = /code length overflow/i;

import * as qr_gen from "qrcode-generator";
(qr_gen as any).stringToBytes = qr_gen.stringToBytesFuncs["UTF-8"];

const min_qrcode = (text: any, level: any, min_ver: number = 1) => {
  min_ver = Math.max(1, min_ver);

  for (let version = min_ver; version <= 40; version += 1) {
    try {
      const qr = (qr_gen as any)(version, level);
      qr.addData(text);
      qr.make();
      const module_count = qr.getModuleCount();
      const is_dark = (row: any, col: any) => {
        return (
          row >= 0 &&
          row < module_count &&
          col >= 0 &&
          col < module_count &&
          qr.isDark(row, col)
        );
      };
      return { text, level, version, module_count, is_dark };
    } catch (err) {
      if (!(version < 40 && RE_CODE_LENGTH_OVERFLOW.test(err as string))) {
        throw new Error(err as string);
      }
    }
  }
  return null;
};

export const quiet_qrcode = (
  text = "",
  level = "L",
  min_ver = 1,
  quiet = 0
) => {
  const qr = min_qrcode(text, level, min_ver);
  if (qr) {
    const prev_is_dark = qr.is_dark;
    qr.module_count += 2 * quiet;
    qr.is_dark = (row, col) => prev_is_dark(row - quiet, col - quiet);
  }
  return qr;
};
