#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const fs_1 = require("fs");
const base58_js_1 = require("base58-js");
const main = async () => {
    if (process.argv.length < 3) {
        console.log("Please specify the path to the solana id you want to export");
        process.exit(1);
    }
    const lastArg = process.argv.at(-1);
    if (!lastArg) {
        throw (new Error("Unable to access argv"));
    }
    let configPath = lastArg;
    try {
        const fileData = await fs_1.promises.readFile(configPath, 'utf-8');
        const privateKey = JSON.parse(fileData);
        console.log((0, base58_js_1.binary_to_base58)(privateKey));
    }
    catch (e) {
        console.error("Unable to read file at ", configPath);
        console.error("Error: ", e);
        process.exit(2);
    }
};
exports.main = main;
(0, exports.main)().catch((e) => {
    console.error("Error: ", e);
});
