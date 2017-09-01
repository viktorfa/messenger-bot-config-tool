import {expect} from 'chai';
import Payload from '../src/models/Payload';

describe('Payload', () => {
  it('simple test', () => {
    const payload = new Payload('');
  });

  it('should validate when the payload text is not empty', () => {
    const payload = new Payload('');
    expect(payload.validate()).to.not.be.true;
    payload.setText('PAYLOAD');
    expect(payload.validate()).to.be.true;
    payload.setText('{}');
    expect(payload.validate()).to.be.true;
    payload.setText('[]');
    expect(payload.validate()).to.be.true;
    payload.setText('{"fis": "Tiss"}');
    expect(payload.validate()).to.be.true;
    payload.setText('{"fis": {"Rumpe": "Ost"}}}');
    expect(payload.validate()).to.be.true;
  });

  it('should not validate when the payload text is above max length limit', () => {
    const payload = new Payload('', 10);
    expect(payload.validate()).to.not.be.true;
    payload.setText('PAYLOAD');
    expect(payload.validate()).to.be.true;
    payload.setText('PAYLOADPAYLOADPAYLOAD');
    expect(payload.validate()).to.not.be.true;
  });

});
