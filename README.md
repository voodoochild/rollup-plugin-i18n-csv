# rollup-plugin-i18n-csv

Rollup plugin to convert CSV i18n definitions into nested JavaScript objects.

## Installation

```bash
npm install --save-dev rollup-plugin-i18n-csv
```

## Usage

### rollup.config.js
```javascript
import buble from "rollup-plugin-buble";
import i18nCsv from "rollup-plugin-i18n-csv";

export default {
    entry   : "src/index.js",
    targets : [
        { dest : pkg.main, format : "cjs" },
        { dest : pkg.module, format : "es" }
    ],
    plugins  : [ buble(), i18nCsv() ]
};
```

### src/i18n.csv
```csv
key,en,de,es,fr
login.forgot.linktext,"Forgot your password?","Passwort vergessen?","¿Has olvidado tu contraseña?","Vous avez oublié votre mot de passe ?"
```

### src/index.js
```javascript
import i18n from "./strings.csv";

console.log(i18n);

// {
//     en : {
//         login : {
//             forgot : {
//                 linktext : "Forgot your password?"
//             }
//         }
//     },
//     ...
// }
```

## Missing translations

If a translation is missing the value will default to the English value wrapped with `[[` `]]` for visibility.

## License

MIT
