const path = require("path");
const fs = require("fs");
const glob = require("glob-all");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const PurgecssPlugin = require("purgecss-webpack-plugin");

function collectWhitelist() {
  // do something to collect the whitelist
  return ['d-n@md+', 'd-n@md-', 'bs-tooltip-bottom', 'tooltip-inner', 'arrow']
}

module.exports = {
  webpack: {
    plugins: [
      new PurgecssPlugin({
        whitelist: collectWhitelist,
        paths: [
          resolveApp("public/index.html"),
          ...glob.sync(`${resolveApp("src")}/**/**/*`, { nodir: true })
        ]
      })
    ]
  }
};
