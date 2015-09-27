let Sidebar = React.createClass({
  render() {
    return (<div className="devtools-sidebar theme-sidebar">
              <Toolbar/>
              <TreeWidget data={this.state.data} ref="tree"/>
            </div>);
  },
  getInitialState() {
    return {
      data: [],
      searchQuery: ""
    }
  },
  componentDidMount() {
    let styles = StylishHelper.getAllStyles(this.state.searchQuery);
    let dataArray = [
      {
        name: L10N.getStr("stylishDevtool.styles.applied"),
        icon: "file",
        items: styles.active
      },
      {
        name: L10N.getStr("stylishDevtool.styles.website"),
        icon: "website",
        items: styles.site
      },
      {
        name: L10N.getStr("stylishDevtool.styles.global"),
        icon: "globe",
        items: styles.global
      },
      {
        name: L10N.getStr("stylishDevtool.styles.application"),
        icon: "firefox",
        items: styles.app
      }
    ];
    this.setState({data: dataArray});
    this.props.tree = this.refs.tree;
    setTimeout(this.componentDidMount.bind(this), 1000)
  }
});
