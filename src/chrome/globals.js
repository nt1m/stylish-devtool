const basePath = "chrome://stylish-devtool";
let {utils: Cu, interfaces: Ci, classes: Cc} = Components;
let {require} =
    Cu.import("resource://devtools/shared/Loader.jsm", {});
let L10N;
try {
  // Firefox 48+
  let { LocalizationHelper } = require("devtools/client/shared/l10n");
  L10N = new LocalizationHelper(`${basePath}/locale/strings.properties`);
} catch(e) {
  // Firefox 44 to 47
  let {ViewHelpers} =
    require("resource://devtools/client/shared/widgets/ViewHelpers.jsm");
  L10N = new ViewHelpers.L10N(`${basePath}/locale/strings.properties`);
}
