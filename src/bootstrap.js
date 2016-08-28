"use strict";

const basePath = "chrome://stylish-devtool";

const {utils: Cu} = Components;
let {require, lazyGetter} =
  Cu.import("resource://devtools/shared/Loader.jsm", {}).devtools;
let {gDevTools} =
  Cu.import("resource://devtools/client/framework/gDevTools.jsm", {});
let LocalizationHelper;
try {
  // Firefox 51
  ({ LocalizationHelper } = require("devtools/shared/l10n"));
} catch(e) {
  // Firefox 48-50
  ({ LocalizationHelper } = require("devtools/client/shared/l10n"));
}
let L10N = new LocalizationHelper(`${basePath}/locale/strings.properties`);
const Services = require("Services");

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
