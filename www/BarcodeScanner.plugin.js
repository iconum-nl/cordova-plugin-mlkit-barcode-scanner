'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const barcodeFormat = Object.freeze({
    Code128: 1,
    Code39: 2,
    Code93: 4,
    CodaBar: 8,
    DataMatrix: 16,
    EAN13: 32,
    EAN8: 64,
    ITF: 128,
    QRCode: 256,
    UPCA: 512,
    UPCE: 1024,
    PDF417: 2048,
    Aztec: 4096,
});
const barcodeType = Object.freeze({
    CONTACT_INFO: 1,
    EMAIL: 2,
    ISBN: 3,
    PHONE: 4,
    PRODUCT: 5,
    SMS: 6,
    TEXT: 7,
    URL: 8,
    WIFI: 9,
    GEO: 10,
    CALENDAR_EVENT: 11,
    DRIVER_LICENSE: 12,
});

const defaultOptions = Object.freeze({
    barcodeFormats: {
        Code128: true,
        Code39: true,
        Code93: true,
        CodaBar: true,
        DataMatrix: true,
        EAN13: true,
        EAN8: true,
        ITF: true,
        QRCode: true,
        UPCA: true,
        UPCE: true,
        PDF417: true,
        Aztec: true,
    },
    beepOnSuccess: false,
    vibrateOnSuccess: false,
    detectorSize: 0.6,
    rotateCamera: false,
});

function keyByValue(obj, value) {
    const keys = Object.keys(obj);
    const index = keys.map((key) => obj[key]).indexOf(value);
    return keys[index] || String(value);
}

class MLKitBarcodeScanner {
    getBarcodeFormat(format) {
        return keyByValue(barcodeFormat, format);
    }
    getBarcodeType(type) {
        return keyByValue(barcodeType, type);
    }
    getBarcodeFormatFlags(barcodeFormats) {
        let barcodeFormatFlag = 0;
        let key;
        const formats = barcodeFormats || defaultOptions.barcodeFormats;
        // eslint-disable-next-line no-restricted-syntax
        for (key in formats) {
            if (barcodeFormat.hasOwnProperty(key) &&
                formats.hasOwnProperty(key) &&
                formats[key]) {
                barcodeFormatFlag += barcodeFormat[key];
            }
        }
        return barcodeFormatFlag;
    }
    scan(userOptions, success, failure) {
        const barcodeFormats = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.barcodeFormats) || defaultOptions.barcodeFormats;
        const config = Object.assign(Object.assign(Object.assign({}, defaultOptions), userOptions), { barcodeFormats: this.getBarcodeFormatFlags(barcodeFormats) });
        this.sendScanRequest(config, success, failure);
    }
    sendScanRequest(config, successCallback, failureCallback) {
        cordova.exec((data) => {
            const [text, format, type] = data;
            successCallback({
                text,
                format: this.getBarcodeFormat(format),
                type: this.getBarcodeType(type),
            });
        }, (err) => {
            switch (err[0]) {
                case null:
                case 'USER_CANCELLED':
                    failureCallback({
                        cancelled: true,
                        message: 'The scan was cancelled.',
                    });
                    break;
                case 'SCANNER_OPEN':
                    failureCallback({
                        cancelled: false,
                        message: 'Scanner already open.',
                    });
                    break;
                default:
                    failureCallback({
                        cancelled: false,
                        message: err[0] || 'Unknown Error',
                    });
                    break;
            }
        }, 'cordova-plugin-mlkit-barcode-scanner', 'startScan', [config]);
    }
}
const barcodeScanner = new MLKitBarcodeScanner();
module.exports = barcodeScanner;

exports.MLKitBarcodeScanner = MLKitBarcodeScanner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFyY29kZVNjYW5uZXIucGx1Z2luLmpzIiwic291cmNlcyI6W10sInNvdXJjZXNDb250ZW50IjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
