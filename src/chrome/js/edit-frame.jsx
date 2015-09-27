let EditFrame = React.createClass({
  render() {
    let url = this.state.id > -1 ? `about:stylish-edit?id=${this.state.id}`
                                 : "data:text/html,<html></html>";
    return (<div className="devtools-main-content">
              <div className="iframe-placeholder">
                {L10N.getStr("stylishDevtool.iframe.placeholder")}
              </div>
              <iframe src={url} onLoad={this.hideNameInput}></iframe>
            </div>)
  },
  getInitialState() {
    return {
      id: -1
    }
  },
  hideNameInput(e) {
    let doc = e.target.contentDocument;
    doc.querySelector("#editor-tools + separator + grid").hidden = true;
  }
});
