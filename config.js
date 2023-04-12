const { JoinCwd } = require("./scripts/utils");

module.exports = {
  /** 开发运行时 runtime */
  tslint: false,

  /** speed-measure-webpack-plugin */
  smp: false,

  /** 主进程端口，开发环境渲染进程端口号 +=1 */
  port: 10166,

  entry: "src/index.tsx",
  output: "dist",
  publicPath: "/",
  alias: {
    "~": JoinCwd(),
    "@": JoinCwd("src"),
  },
};
