import Baby from "babyparse";
import set from "lodash.set";

export default function i18nCsv() {
    const re = new RegExp(/^(.*\.(csv$))?[^.]*$/i);

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
            if(re.test(id)) {
                return `export default ${JSON.stringify(makeObject(code))};`;
            }
        }
    };
}
