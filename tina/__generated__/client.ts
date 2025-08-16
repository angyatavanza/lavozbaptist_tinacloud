import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'a85d5ee699ff1356512bdde5c2565bf1e435053f', queries,  });
export default client;
  