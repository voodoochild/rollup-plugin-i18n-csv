const assert = require("assert"),
      rollup = require("rollup"),
      buble = require("rollup-plugin-buble"),
      i18nCsv = require("..");

process.chdir(__dirname);

function makeBundle(entry, options = {}) {
    return rollup.rollup({
        entry   : entry,
        plugins : [ buble(), i18nCsv(options) ]
    });
}

function testBundle(bundle) {
    const generated = bundle.generate(),
          code = generated.code,
          fn = new Function("assert", code);

    fn(assert);
}

describe("rollup-plugin-i18n-csv", () => {
    it("converts csv", () =>
        makeBundle("samples/basic.js").then(testBundle)
    );

    it("defaults to en when translations missing", () =>
        makeBundle("samples/default-to-en.js").then(testBundle)
    );

    it("accepts a custom path option", () =>
        makeBundle("samples/custom-path.js", {
            path : (row, field) => ([ field, row.key ])
        }).then(testBundle)
    );
});
