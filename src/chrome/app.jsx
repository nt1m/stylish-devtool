let StylishDevTool = React.createClass({
  getInitialState() {
    return {};
  },
  render() {
    return (
      <div className="container">
        <Sidebar ref="sidebar" />
        <EditFrame ref="editFrame" />
      </div>
    );
  },
  componentDidMount() {
    this.props.sidebar = this.refs.sidebar;
    this.props.editFrame = this.refs.editFrame;
  }
});

let App = <StylishDevTool />;
React.render(App, document.querySelector("#wrapper"));
