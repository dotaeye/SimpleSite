import crypto from 'crypto'

var Crypto = {
  hashCrypto: function (content) {
    return crypto.createHmac('sha1', this.getPrivateKey())
      .update(content)
      .digest('hex');
  },
  getPrivateKey: function () {
    return "qhe9gfRxWIrJVt2bXP9ltwzup1hWnvYEQ";
  }
};
export default  Crypto;