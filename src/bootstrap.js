"use strict";

const basePath = "chrome://stylish-devtool";

const {utils: Cu} = Components;
let require, lazyGetter, gDevTools, ViewHelpers;
try {
  ({require, lazyGetter} =
    Cu.import("resource://devtools/shared/Loader.jsm", {}).devtools);
  ({gDevTools} =
    Cu.import("resource://devtools/client/framework/gDevTools.jsm", {}));
  ({ViewHelpers} =
    require("resource://devtools/client/shared/widgets/ViewHelpers.jsm"));
} catch(e) {
  // Fallback to old paths
  ({require, lazyGetter} =
    Cu.import("resource://gre/modules/devtools/Loader.jsm", {}).devtools);
  ({gDevTools} =
    Cu.import("resource:///modules/devtools/gDevTools.jsm", {}));
  ({ViewHelpers} =
    require("resource:///modules/devtools/ViewHelpers.jsm"));
}
const Services = require("Services");

const L10N = new ViewHelpers.L10N(`${basePath}/locale/strings.properties`);

lazyGetter(this, "toolDefinition", () => ({
  id: "stylish",
  icon: `${basePath}/skin/images/icon.svg`,
  invertIconForLightTheme: true,
  url: `${basePath}/content/panel.html`,
  label: L10N.getStr("stylishDevtool.label"),
  tooltip: L10N.getStr("stylishDevtool.tooltip"),

  isTargetSupported: function(target) {
    return target.isLocalTab;
  },

  build: function(iframeWindow, toolbox) {
    let {StylishPanel} = require(`${basePath}/content/panel.js`);
    return new StylishPanel(iframeWindow, toolbox);
  }
}));

function startup() {
  gDevTools.registerTool(toolDefinition);
}

function shutdown() {
  gDevTools.unregisterTool(toolDefinition);
  Services.obs.notifyObservers(null, "startupcache-invalidate", null);
}

function install() {}

function uninstall() {}
