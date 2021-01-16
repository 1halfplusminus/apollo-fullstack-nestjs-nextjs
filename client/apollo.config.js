module.exports = {
  client: {
    service: {
      url: "http://localhost:3000/graphql",
    },
    includes: ["./queries/**/*.tsx", "./lib/*.tsx", "./apollo/*.ts"],
    excludes: [".next/*", "node_modules/*"],
    // optional disable SSL validation check
    skipSSLValidation: true,
  },
};
