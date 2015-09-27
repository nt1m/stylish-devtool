let TreeWidget = React.createClass({
  getDefaultProps() {
    return {
      data: []
    }
  },
  getInitialState() {
    return {
      selectedIndex: 0
    }
  },
  setTreeState(state) {
    this.setState(state)
  },
  render() {
    let items = this.props.data.map((item, index) => {
      return <TreeWidgetItem {...item} index={index}
                             selectedIndex={this.state.selectedIndex}
                             setTreeState={this.setTreeState}/>
    });
    return (<div className="tree" data-index={this.state.selectedIndex}>{items}</div>);
  }
});
let TreeWidgetItem = React.createClass({
  render() {
    let iconClass = `devtools-icon ${this.props.icon}`;
    let twistyHidden = !this.props.items;
    let items;
    if (this.props.items) {
      items = this.props.items.map((item, index) => {
        let absIndex = Number(`${this.props.index}.${index + 1}`);
        return <TreeWidgetItem {...item} index={absIndex}
                               setTreeState={this.props.setTreeState}
                               selectedIndex={this.props.selectedIndex}/>;
      });
    }
    return (
      <div className="tree-item"
           onClick={this.onClick}
           data-selected={this.props.index == this.props.selectedIndex}
           data-expanded={this.state.expanded}
           data-folder={!!this.props.items}
           data-index={this.props.index}>
        <div className="tree-item-contents">
          <i className="twisty" hidden={twistyHidden}></i>
          <i className={iconClass}></i>
          <span className="tree-item-name">{this.props.name}</span>
        </div>
        {items}
      </div>
    );
  },
  getInitialState() {
    return {
      expanded: false
    }
  },
  onClick(e) {
    if (this.props.items) {
      this.setState({expanded: !this.state.expanded})
    }
    this.props.setTreeState({
      selectedIndex: this.props.index,
      id: this.props.id
    });
    App.props.editFrame.setState({id: this.props.id || -1});
    e.preventDefault();
    e.stopPropagation();
  }
});
