const basePath = "chrome://stylish-devtool";
let {utils: Cu, interfaces: Ci, classes: Cc} = Components;
let {require} = Cu.import("resource://devtools/shared/Loader.jsm", {});
let LocalizationHelper;
try {
  // Firefox 51
  ({ LocalizationHelper } = require("devtools/shared/l10n"));
} catch(e) {
  // Firefox 48-50
  ({ LocalizationHelper } = require("devtools/client/shared/l10n"));
}
let L10N = new LocalizationHelper(`${basePath}/locale/strings.properties`);
