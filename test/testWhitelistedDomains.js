import {expect} from 'chai';
import WhitelistedDomains from '../src/models/WhitelistedDomains';

describe('WhitelistedDomains', () => {
  let validPureDomain = 'www.example.com';
  let validDomainWithProtocolAndTrailingSlash = 'http://example.com/about/';
  let emptyString = '';
  let notDomain = 'Kake er godt.';
  let invalidDomain1 = 'sm.s-';
  let invalidDomain2 = 'fdsfsdfdsf..sdf';

  it('simple test', () => {
    const whitelistedDomains = new WhitelistedDomains();
    expect(whitelistedDomains.getDomains().length).to.equal(0);
  });

  it('should validate strings with a domain in them', () => {
    expect(WhitelistedDomains.validateDomain(validPureDomain)).to.be.true;
    expect(WhitelistedDomains.validateDomain(validDomainWithProtocolAndTrailingSlash)).to.be.true;
    expect(WhitelistedDomains.validateDomain(emptyString)).to.be.false;
    expect(WhitelistedDomains.validateDomain(invalidDomain1)).to.be.false;
    expect(WhitelistedDomains.validateDomain(invalidDomain2)).to.be.false;
  });

  it('should capture domains from string with a valid domain', () => {
    expect(WhitelistedDomains.captureDomain(validPureDomain)).to.equal(validPureDomain);
    expect(WhitelistedDomains.captureDomain(validDomainWithProtocolAndTrailingSlash)).to.equal('example.com');
    expect(WhitelistedDomains.captureDomain(emptyString)).to.be.null;
    expect(WhitelistedDomains.captureDomain(notDomain)).to.be.null;
    expect(WhitelistedDomains.captureDomain(invalidDomain1)).to.be.null;
    expect(WhitelistedDomains.captureDomain(invalidDomain2)).to.be.null;
  });

  it('should be able to add domains', () => {
    const whitelistedDomains = new WhitelistedDomains();
    whitelistedDomains.addDomain(validPureDomain);
    expect(whitelistedDomains.getDomains().length).to.equal(1);
    expect(whitelistedDomains.getDomains().find(x => x === validPureDomain)).to.not.be.null;
    whitelistedDomains.addDomain('1' + validPureDomain);
    expect(whitelistedDomains.getDomains().length).to.equal(2);
    expect(whitelistedDomains.getDomains().find(x => x === '1' + validPureDomain)).to.not.be.null;
  });

  it('should throw an error when trying to add an invalid domain', () => {
    const whitelistedDomains = new WhitelistedDomains();
    expect(() => whitelistedDomains.addDomain(invalidDomain2)).to.throw();
  });

  it('should be able to remove domains', () => {
    const whitelistedDomains = new WhitelistedDomains();
    whitelistedDomains.addDomain(validPureDomain);
    expect(whitelistedDomains.getDomains().length).to.equal(1);
    whitelistedDomains.removeDomain(emptyString);
    expect(whitelistedDomains.getDomains().length).to.equal(1);
    whitelistedDomains.removeDomain(validPureDomain);
    expect(whitelistedDomains.getDomains().length).to.equal(0);
  });

  it('should be able to construct an object ready to be sent as JSON in a request', () => {
    const whitelistedDomains = new WhitelistedDomains();
    whitelistedDomains.addDomain(validPureDomain);
    whitelistedDomains.addDomain(validDomainWithProtocolAndTrailingSlash);
    const actual = whitelistedDomains.createBodyForRequest();
    JSON.stringify(actual);
    expect(actual.whitelisted_domains).to.be.an('array');
  });

  it('should be able to construct a WhitelistedDomains instance from a JSON object', () => {
    const previous = ['http://example.com', 'https://www.facebook.com'];
    const actual = WhitelistedDomains.constructFromPrevious(previous);
    expect(actual.getDomains().length).to.equal(2);
  });
});
