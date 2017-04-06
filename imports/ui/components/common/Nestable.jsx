import React from 'react'
import GridLoader from './halogen/GridLoader';

export default class Nestable extends React.Component{
  render(){
    var items = this.props.items;

    return(
      <div className="dd" id="nestable">
        <OrderedList items={items}/>
      </div>
    );
  }
}

class Item extends Nestable{
  render(){
    var isFulfilled = this.props.isFulfilled;

    return(
      <li className="dd-item" >
        <div className={"dd-handle" + (isFulfilled ? " fulfilled" : " incomplete")} style={styles.item}>
            {this.props.itemName}
            {/* {(this.props.toUE ? this.props.getMCforUE : null)} */}
        </div>
      </li>
    );
  }
}

class ListItem extends Nestable{
  constructor(){
    super();
    this.state = {
      isCollapsed: true
    }
  }

  toggleCollapse() {
      this.setState({isCollapsed: !this.state.isCollapsed});
  }
  render(){
    var isCollapsed = this.state.isCollapsed;
    var isFulfilled = this.props.isFulfilled;
    var listName = this.props.listName;

    return(
      <li className="dd-item">
        <div className={"dd-handle" + (isFulfilled ? " fulfilled" : " incomplete")} style={styles.list}
          onClick={this.toggleCollapse.bind(this)}>
            <i  className={"fa fa-"+ (isCollapsed ? "plus" : "minus")}
                style={styles.collapseIcon}>
            </i>
            {listName}
            {/* {(this.props.toUE ? this.props.getMCforUE : null)} */}
        </div>
        <OrderedList items={this.props.items} isCollapsed={isCollapsed}/>
      </li>
    );
  }
}

class OrderedList extends Nestable{
  render(){
    var items = this.props.items;
    var isCollapsed = this.props.isCollapsed;
    var color = "#ff6600";

    if(items){
        return(
          <ol className="dd-list" style={{display: isCollapsed ? "none" : "" }}>
            {
              items.map((item, index) => {
              if(item.name === undefined)
                return <div className="loader-nestable" key={index}>
                    <GridLoader color={color}/>
                  </div>
              else if(item.children == undefined || item.children.length == 0 && item.name!== undefined){
                //item is a single entry
                return <Item itemName={item.name} key={index} isFulfilled={item.isFulfilled}/>;
                // return <Item itemName={item.name} key={index} isFulfilled={item.isFulfilled()} toUE={item.toUE} getMCforUE={item.getMCforUE()}/>;
              }
              else {
                //item is a list
                return <ListItem listName={item.name} items={item.children} key={index} isFulfilled={item.isFulfilled}/>;
                // return <ListItem listName={item.name} items={item.children} key={index} isFulfilled={item.isFulfilled()} toUE={item.toUE} getMCforUE={item.getMCforUE()}/>;
              }
            })
          }
          </ol>
        );
    }
    else {
      return <div className="loader-nestable"><GridLoader color={color}/></div>
    }
  }
}

const styles = ({
  collapseIcon: {
    width: 1.3 +'em',
    fontSize: 0.7+'em'
  },
  completeIcon: {
    width: 1.3 +'em',
    fontSize: 0.7+'em',
    fontColor: 'green'
  },
  incompleteIcon: {
    width: 1.3 +'em',
    fontSize: 0.7+'em',
    fontColor: 'green'
  },
  list: {
    cursor: "pointer",
    height: "auto"
  },
  item: {
    cursor: "default",
    height: "auto"
  }
});
