const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  images: {
    domains: ["images2.imgbox.com"],
  },
  excludeFile: (str) =>
    /\*.{spec,test}.js/.test(str) || /.__generated__./.test(str),
});
