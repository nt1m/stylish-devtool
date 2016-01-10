let tabs = require("sdk/tabs");
let StylishService = Cc["@userstyles.org/style;1"]
                     .getService(Components.interfaces.stylishStyle);
let StylishHelper = {
  getStyles(type, query = "") {
    let styles;
    switch(type) {
      case "site":
      case "global":
      case "app":
        styles = StylishService.findByMeta("type", type, StylishService.REGISTER_STYLE_ON_CHANGE, {});
        break;
      case "active":
        styles = StylishService.findForUrl(tabs.activeTab.url, false, StylishService.REGISTER_STYLE_ON_CHANGE, {});
        break;
    }
    if (type == "site") {
      let appliedStyles = StylishService.findForUrl(tabs.activeTab.url, false, StylishService.REGISTER_STYLE_ON_CHANGE, {});
      styles = styles.filter((style) => {
        return appliedStyles.indexOf(style) == -1;
      });
    }
    if (query !== "") {
      styles = styles.filter((style) => {
        return style.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }
    styles = styles.map(style => {
      return {
        name: style.name,
        id: style.id,
        icon: "beautify"
      };
    });
    return styles;
  },
  getAllStyles(query = "") {
    return {
      active: this.getStyles("active", query),
      site: this.getStyles("site", query),
      global: this.getStyles("global", query),
      app: this.getStyles("app", query)
    }
  }
}
