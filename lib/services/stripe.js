var stripe = require("stripe")("sk_test_xgiSJz3Y7Kr6rawdJ6e1NSDQ00EcVv1or0");

export class StripeService {
  constructor({
    log
  }) {
    this.log = log.child({
      service: 'stripe'
    })
  }

  async charge ({ tokenId }) {
      const { status } = await stripe.charges.create({
        amount: 200,
        currency: 'usd',
        description: 'Example charge',
        source: tokenId,
      });
      console.log(status);
    return "succeeded"
  }
}
