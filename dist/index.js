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
const supabase_js_1 = require("@supabase/supabase-js");
const sbURL = "https://ynzxmqprfytwhfxlvrpr.supabase.co";
const sbKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluenhtcXByZnl0d2hmeGx2cnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxNzcxMDIsImV4cCI6MjA0Mjc1MzEwMn0.cUU5gk9WBBee7VkZyZAixw6blYytW5qDIylnt4gGFeM";
const supabase = (0, supabase_js_1.createClient)(sbURL, sbKey);
const myFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.from("countries").select("code");
    return data;
});
const myData = myFunc();
console.log(myData);
