import Baby from "babyparse";
import set from "lodash.set";
import { createFilter } from "rollup-pluginutils";

export default function i18nCsv(options = {}) {
    const include = options.include || "**/*.csv",
          filter = createFilter(include, options.exclude);

    function makeObject(file) {
        let csv    = Baby.parse(file, { header : true }),
            fields = csv.meta.fields.filter((field) => field !== "key"),
            strings = {};

        // build out I18n object
        csv.data.forEach((row) => {
            fields.forEach((field) => {
                let value = row[field];

                // Sometimes we get empty row data, filter it out
                if(!row.key) {
                    return;
                }

                if(!value) {
                    value = field.indexOf("en") === 0 ? row.en : `[[${row.en}]]`;
                }

                set(strings, `${field}.${row.key}`, value);
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
