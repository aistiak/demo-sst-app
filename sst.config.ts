import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "demo-sst-app",
      region: "eu-central-1",
      profile : "langsy-dev-arif" ,
      stage : "dev"
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
