const httpSignature = require('http-signature');

module.exports = function (secret) {
  return function signature(ctx, next) {
    const parsed = httpSignature.parseRequest(ctx.req);
    if (!httpSignature.verifyHMAC(parsed, secret)) {
      return ctx.throw(401);
    }

    next();
  };
}