import Papa from "papaparse";
import setWith from "lodash.setwith";
import { createFilter } from "rollup-pluginutils";

export default function i18nCsv(options = {}) {
    const include = options.include || "**/*.csv",
          filter = createFilter(include, options.exclude);

    function makeObject(file) {
        const csv    = Papa.parse(file, { header : true }),
              fields = csv.meta.fields.filter((field) => field !== "key"),
              path   = options.path ? options.path : (row, field) => `${field}.${row.key}`;

        let strings = {};

        csv.data.forEach((row) => {
            fields.forEach((field) => {
                let value = row[field];

                if(!row.key) {
                    return;
                }

                if(!value) {
                    value = field.indexOf("en") === 0 ? row.en : `[[${row.en}]]`;
                }

                setWith(strings, path(row, field), value, Object);
            });
        });

        return strings;
    }

    return {
        name : "i18n-csv",

        transform : (code, id) => {
            if(filter(id)) {
                return {
                    code : `export default ${JSON.stringify(makeObject(code))};`,
                    map  : { mappings : "" }
                };
            }
        }
    };
}
