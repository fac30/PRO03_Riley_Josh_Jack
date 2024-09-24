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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processFlagRequest = exports.getFlagUrl = void 0;
const countryCode = 'FR';
const getFlagUrl = (countryCode) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://flagsapi.com/${countryCode}/flat/64.png`);
});
exports.getFlagUrl = getFlagUrl;
const get_flag_1 = require("./get-flag");
const processFlagRequest = (countryCode) => {
    const flagUrl = (0, exports.getFlagUrl)(countryCode);
    // Further processing, e.g., sending the URL as a response
    return flagUrl;
};
exports.processFlagRequest = processFlagRequest;
