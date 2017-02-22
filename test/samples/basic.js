/* global assert */
import csv from "./data.csv";

assert.equal(csv.en.login.forgot.linktext, "Forgot your password?");
assert.equal(csv.de.login.forgot.linktext, "Passwort vergessen?");
assert.equal(csv.es.login.forgot.linktext, "¿Has olvidado tu contraseña?");
assert.equal(csv.fr.login.forgot.linktext, "Vous avez oublié votre mot de passe ?");
