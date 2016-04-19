const basePath = "chrome://stylish-devtool";
let {utils: Cu, interfaces: Ci, classes: Cc} = Components;
let require, L10N;
try {
  ({require} =
    Cu.import("resource://devtools/shared/Loader.jsm", {}));
  let { LocalizationHelper } = require("devtools/client/shared/l10n");
  L10N = new LocalizationHelper(`${basePath}/locale/strings.properties`);
} catch(e) {
  ({require} =
    Cu.import("resource://gre/modules/devtools/Loader.jsm", {}).devtools);
  let {ViewHelpers} = require("resource:///modules/devtools/ViewHelpers.jsm");
  L10N = new ViewHelpers.L10N(`${basePath}/locale/strings.properties`);
}
