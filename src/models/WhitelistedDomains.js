import _ from 'lodash';

const domainRegex = /((?:[a-zA-Z0-9]+\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})/i;

class WhitelistedDomains {
  constructor(initialDomains) {
    this.domains = [];
    if (initialDomains) {
      initialDomains.forEach(domain => this.addDomain(domain));
    }
    this.maxLength = 50;
  }

  addDomain(domain) {
    if (this.domains.length >= 50) {
      throw new Error(`Too many domains. Max is ${this.maxLength}.`);
    } else if (this.domains.find(x => x === domain)) {
      throw new Error(`${domain} is already in the list.`)
    } else if (!WhitelistedDomains.validateDomain(domain)) {
      throw new Error(`Domain is not valid: ${domain}`);
    } else {
      this.domains = [...this.domains, WhitelistedDomains.captureDomain(domain)];
    }
  }

  removeDomain(domain) {
    const prevLength = this.domains.length;
    this.domains = this.domains.filter(x => x !== domain);
    return prevLength !== this.domains.length;
  }

  getDomains() {
    return this.domains;
  }

  createBodyForRequest() {
    return {
      whitelisted_domains: this.domains.map(domain => `https://${domain}`)
    }
  }

  static constructFromPrevious(previous) {
    return new WhitelistedDomains(previous);
  }

  static captureDomain(domain) {
    const matches = domain.match(domainRegex);
    if (matches) {
      return matches[0];
    } else {
      return null;
    }
  }

  static validateDomain(domain) {
    if (!_.isString(domain)) {
      return false;
    }
    return !!WhitelistedDomains.captureDomain(domain);
  }
}

export default WhitelistedDomains;
