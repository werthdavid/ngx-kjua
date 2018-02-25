export class QrCodeHelper {

  /**
   *  Make the code for creating an SMS.
   *  Number can be provided as number or string (useful for international format e.g. +1 for USA)
   *
   * @paramnumber
   * @param text
   */
  static makeSMS(number: number | string, text?: string): string {
    if (text) {
      if (text.length > 160) {
        return `SMSTO:${number}:${text.substr(0, 160)}`;
      } else {
        return `SMSTO:${number}:${text}`;
      }
    } else {
      return `SMSTO:${number}`;
    }
  }

  /**
   * Make the code for making a phone call
   * Number can be provided as number or string (useful for international format e.g. +1 for USA)
   *
   * @param number
   */
  static makeCall(number: number | string): string {
    return `tel:${number}`;
  }

  /**
   * Make the code for encoding a location
   *
   * @param lat
   * @param lon
   * @param meters
   */
  static makeGeo(lat: string, lon: string, meters = 400): string {
    return `geo:${lat},${lon},${meters}`;
  }

  /**
   * Make the code for encoding an event in iCal format
   *
   * @param description
   * @param begin
   * @param end
   */
  static makeEvent(description: string, begin: Date, end: Date): string {
    return `BEGIN:VEVENT
SUMMARY:${description}
DTSTART:20180208T110000Z
DTEND:20180210T110000Z
END:VEVENT`;
  }

  /**
   * Make the code for an Email
   *
   * @param recipient
   * @param subject
   * @param text
   */
  static makeEmail(recipient: string, subject?: string, text?: string): string {
    let retVal = `MATMSG:TO:${recipient};`;
    if (subject) {
      retVal += `SUB:${subject}`;
    }
    retVal += `;`;
    if (text) {
      retVal += `BODY:${text}`;
    }
    retVal += `;;`;
    return retVal;
  }

  /**
   * Make the code that lets user login to a WiFi
   * If no pass is provided, the WiFi is considered as not encrypted (no WPA)
   *
   * @param ssid
   * @param pass
   * @param hidden
   */
  static makeWifi(ssid: string, pass?: string, hidden = false): string {
    let retVal = `WIFI:${!!pass ? 'T:WPA' : 'T:nopass'};S:${ssid};`;
    if (pass) {
      retVal += `P:${pass}`;
    }
    retVal += `;`;
    if (hidden) {
      retVal += `H:true`;
    }
    retVal += `;`;
    return retVal;
  }

  /**
   * Make the code that encodes contact information.
   * Numbers can be provided as number or string (useful for international format e.g. +1 for USA)
   * Encoding is done with MECARD-format and NOT VCard! VCard gives a longer string and therefore a
   * bigger code which has a negative impact on readability for scanners. You can, of course, create
   * a VCard string as well but the format is more complex.
   *
   * @param name
   * @param telNumbers
   * @param address, values separated with comma
   * @param email
   * @param url
   */
  static makeContactMeCard(name: string, telNumbers?: string[] | number[], address?: string, email?: string, url?: string): string {
    let retVal = `MECARD:
N:${name};`;
    if (address) {
      retVal += `ADR:${address};`;
    }
    if (telNumbers && telNumbers.length > 0) {
      for (let i = 0; i < telNumbers.length; i++) {
        retVal += `TEL:${telNumbers[i]};`;
      }
    }
    if (email) {
      retVal += `EMAIL:${email};`;
    }
    if (url) {
      retVal += `URL:${url};`;
    }
    retVal += `;`;
    return retVal;
  }
}
