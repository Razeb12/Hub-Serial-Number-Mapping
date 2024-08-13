"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCustomerNumbers = fetchCustomerNumbers;
exports.fetchCustomerAddress = fetchCustomerAddress;
exports.validateAddress = validateAddress;
exports.retrieveAllAddresses = retrieveAllAddresses;
exports.saveAddressesToCSV = saveAddressesToCSV;
var axios_1 = require("axios");
var fs_1 = require("fs");
var json2csv_1 = require("json2csv");
var API_KEY = "ssfdsjfksjdhfgjfgvjdshgvshgkjsdlgvkjsdgjkl";
var BASE_URL = "https://clemant_demo.com";
function fetchCustomerNumbers() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat(BASE_URL, "/customer_numbers"), {
                        headers: {
                            "X-API-KEY": API_KEY,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function fetchCustomerAddress(customerNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat(BASE_URL, "/address_inventory/").concat(customerNumber), {
                        headers: {
                            "X-API-KEY": API_KEY,
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function validateAddress(address) {
    return (typeof address.id === "number" &&
        typeof address.first_name === "string" &&
        typeof address.last_name === "string" &&
        typeof address.street === "string" &&
        typeof address.postcode === "string" &&
        typeof address.state === "string" &&
        typeof address.country === "string" &&
        typeof address.lat === "number" &&
        typeof address.lon === "number");
}
function retrieveAllAddresses() {
    return __awaiter(this, void 0, void 0, function () {
        var customerCount, addresses, i, address;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchCustomerNumbers()];
                case 1:
                    customerCount = _a.sent();
                    addresses = [];
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i <= customerCount)) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetchCustomerAddress(i)];
                case 3:
                    address = _a.sent();
                    if (validateAddress(address)) {
                        addresses.push(address);
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, addresses];
            }
        });
    });
}
function saveAddressesToCSV(addresses) {
    var csv = (0, json2csv_1.parse)(addresses);
    var fileName = "customer_addresses.csv";
    (0, fs_1.writeFileSync)(fileName, csv);
    return fileName;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var addresses, csvFileName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, retrieveAllAddresses()];
                case 1:
                    addresses = _a.sent();
                    csvFileName = saveAddressesToCSV(addresses);
                    console.log("CSV File saved as: ".concat(csvFileName));
                    console.table(addresses);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error occurred:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
main();
