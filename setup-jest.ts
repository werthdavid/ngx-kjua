import "jest-preset-angular/setup-jest";
import "./projects/ngx-kjua/src/lib/kjua/lib/qrcode"

// We have to mock the whole thing as "qrcode-generator" needs to override the stringToBytes method
// but typescript can't properly hande that
jest.mock("./projects/ngx-kjua/src/lib/kjua/lib/qrcode", ()=>({
  quiet_qrcode: jest.fn()
}))
