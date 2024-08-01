import { CodegenConfig } from "@graphql-codegen/cli";

let schema = "https://shop.casemoishop4life.website/graphql";

const config: CodegenConfig = {
  schema,
  documents: ["app/**/*.ts"],
  generates: {
    "./app/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
