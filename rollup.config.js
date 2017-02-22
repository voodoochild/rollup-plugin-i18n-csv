import buble from "rollup-plugin-buble";

const pkg = require("./package.json"),
    external = Object.keys(pkg.dependencies);

export default {
    entry   : "src/index.js",
    targets : [
        { dest : pkg.main, format : "cjs" },
        { dest : pkg.module, format : "es" }
    ],
    plugins  : [ buble() ],
    external : external
};
