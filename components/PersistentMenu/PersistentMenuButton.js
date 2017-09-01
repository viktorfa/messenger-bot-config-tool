import React from "react";
import s from './styles.css';
class PersistentMenuButton extends React.Component {

  deleteMenuItem(event, menuItem) {
    event.preventDefault();
    this.props.deleteMenuItem(menuItem.id);
  }

  clickEditSubMenu(event) {
    event.preventDefault();
    console.log("CLICK EDIT SUB MENU");
    if (this.props.menuItem.level === 1) {
      this.props.startEditSubMenu(this.props.menuItem.id);
    } else if (this.props.menuItem.level === 2) {
      this.props.startEditSubSubMenu(this.props.menuItem.id);
    }
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <div className={`${s['persistent-menu-button']}`}>
        <div onClick={event => this.props.clickMenuItem(event, this.props.menuItem)}
             className={`${s['persistent-menu-button-content']}`}>
          <span>
            {this.props.menuItem.title || 'Enter title'}
          </span>
          <span>
            {
              this.props.menuItem.type === 'web_url' &&
              <span className="mdl-chip">
                <a target="_blank" href={this.props.menuItem.url} className="mdl-chip__text">
                {this.props.menuItem.url.length < 40 ? this.props.menuItem.url : `${this.props.menuItem.url.substr(0, 37)}...`}
                </a>
              </span>
              ||
              this.props.menuItem.type === 'postback' &&
              <span className="mdl-chip"><span className="mdl-chip__text">postback</span></span>
              ||
              this.props.menuItem.type === 'nested' &&
              <button className="mdl-button" onClick={event => this.clickEditSubMenu(event)}>Edit menu</button>
            }
          </span>
        </div>
        <button className="mdl-button mdl-button--icon"
                onClick={event => this.deleteMenuItem(event, this.props.menuItem)}>
          <i className="material-icons">
            delete
          </i>
        </button>
      </div>
    )
  }
}

export default PersistentMenuButton;
