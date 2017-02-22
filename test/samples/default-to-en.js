/* global assert */
import csv from "./data.csv";

assert.equal(csv.en.login.success.linktext, "Logged in");
assert.equal(csv.de.login.success.linktext, "[[Logged in]]");
assert.equal(csv.es.login.success.linktext, "[[Logged in]]");
assert.equal(csv.fr.login.success.linktext, "[[Logged in]]");
