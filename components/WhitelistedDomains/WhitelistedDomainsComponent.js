import React from "react";
import WhitelistedDomains from '../../src/models/WhitelistedDomains';

class WhitelistedDomainsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newDomain: ''};
  }

  addDomain(event) {
    event.preventDefault();
    this.props.addDomain(this.state.newDomain);
    this.setState({newDomain: ''});
  }

  removeDomain(event, domain) {
    event.preventDefault();
    this.props.removeDomain(domain);
  }

  domainChange(event) {
    event.preventDefault();
    this.setState({newDomain: event.target.value});
  }

  render() {
    return (
      <div>
        <div>
          <ul className="demo-list-item mdl-list">
            {
              this.props.whitelistedDomains.domains.map((domain, index) => {
                return (
                  <li className="mdl-list__item" key={index}>
                    <span>{domain}</span>
                    <button className="mdl-button mdl-button--icon"
                            onClick={event => this.removeDomain(event, domain)}>
                      <i className="material-icons">
                        delete
                      </i>
                    </button>
                  </li>
                )
              })
            }
            <li className="mdl-list__item">
              <form onSubmit={event => this.addDomain(event)}>
                <div className="mdl-textfield mdl-js-textfield">
                  <label htmlFor={`new-domain`} className="mdl-textfield__label">domain.example.com</label>
                  <input type="text" id={`new-domain`} className="mdl-textfield__input"
                         value={this.state.newDomain}
                         onChange={event => this.domainChange(event)}/>
                {
                  !WhitelistedDomains.validateDomain(this.state.newDomain) && this.state.newDomain.length > 0 &&
                  <span style={{position: 'absolute', color: 'red', fontSize: 'small'}}>Not a valid domain</span>
                }
                </div>
                <button type="submit" className="mdl-button mdl-button--icon">
                  <i className="material-icons">
                    add
                  </i>
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default WhitelistedDomainsComponent;
