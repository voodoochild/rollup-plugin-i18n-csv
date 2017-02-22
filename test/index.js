var assert = require("assert"),
    rollup = require("rollup"),
    buble = require("rollup-plugin-buble"),
    i18nCsv = require("..");

process.chdir(__dirname);

describe("rollup-plugin-i18n-csv", function() {
    it("converts csv", function() {
        return rollup.rollup({
            entry   : "samples/basic.js",
            plugins : [ buble(), i18nCsv() ]
        })
        .then(function(bundle) {
            var generated = bundle.generate(),
                code = generated.code,
                fn = new Function("assert", code);

            fn(assert);
        });
    });

    it("defaults to en when translations missing", function() {
        return rollup.rollup({
            entry   : "samples/default-to-en.js",
            plugins : [ buble(), i18nCsv() ]
        })
        .then(function(bundle) {
            var generated = bundle.generate(),
                code = generated.code,
                fn = new Function("assert", code);

            fn(assert);
        });
    });
});
