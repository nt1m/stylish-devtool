const basePath = "chrome://stylish-devtool";
const {utils: Cu, interfaces: Ci, classes: Cc} = Components;
let require, ViewHelpers;
try {
  ({require} =
    Cu.import("resource://devtools/shared/Loader.jsm", {}));
  ({ViewHelpers} =
 require("resource://devtools/client/shared/widgets/ViewHelpers.jsm"));
} catch(e) {
  ({require} =
    Cu.import("resource://gre/modules/devtools/Loader.jsm", {}).devtools);
  ({ViewHelpers} = require("resource:///modules/devtools/ViewHelpers.jsm"));
}
const L10N = new ViewHelpers.L10N(`${basePath}/locale/strings.properties`);
