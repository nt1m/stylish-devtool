let Toolbar = React.createClass({
  render() {
    function addNewStyle() {
      tabs.open({url: "about:stylish-edit"});
    }
    return (<div className="devtools-toolbar">
              <SearchBox ref="searchBox"/>
              <Button tooltip={L10N.getStr("stylishDevtool.newStyle")}
                      icon="add"
                      onClick={addNewStyle} />
            </div>);
  }
});
let SearchBox = React.createClass({
  render() {
    return (
      <div className="devtools-searchbox">
        <input type="search"
               ref="searchInput"
               placeholder={L10N.getStr("stylishDevtool.filterUserStyles")}
               className={`devtools-searchinput ${this.state.filled ? "filled"
                                                                    : ""}`}
               onInput={this.updateSearchQuery}/>
        <button className="devtools-searchinput-clear"
                onClick={this.clearInput}>
        </button>
      </div>
    );
  },
  clearInput() {
    let input = this.refs.searchInput.getDOMNode();
    input.value = "";
    App.props.sidebar.setState({searchQuery: ""});
    this.setState({filled: false})
  },
  updateSearchQuery(e) {
    let searchQuery = e.target.value.trim();
    this.setState({filled: searchQuery !== ""});
    App.props.sidebar.setState({searchQuery: searchQuery});
  },
  getInitialState() {
    return {
      filled: false
    }
  }
});
let Button = React.createClass({
  render() {
    return (
      <button className="devtools-toolbarbutton"
              onClick={this.props.onClick}
              title={this.props.tooltip}>
        <i className={"devtools-icon " + this.props.icon}></i>
      </button>
    );
  }
})
