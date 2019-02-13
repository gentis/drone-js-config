const Octokit = require('@octokit/rest');
const util = require('util');
const debug = util.debuglog('drone-js-config:github');

module.exports = function ({ server, token }) {
  const octokit = Octokit({ baseUrl: server, auth: token });

  return async function github(ctx, next) {
    const {
      Repo: { Namespace: owner, Name: repo, Config: path },
      Build: { After: ref }
    } = ctx.request.body;

    try {
      const resp = await octokit.repos.getContents({ owner, repo, path, ref });
      ctx.content = Buffer.from(resp.data.content, 'base64').toString('ascii');
    } catch (e) {
      debug(e);
    }

    next();
  }
}