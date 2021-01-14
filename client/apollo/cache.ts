import { InMemoryCache, Reference } from "@apollo/client";
import uniqBy from "lodash/uniqBy";

export const createCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launches: {
            keyArgs: false,
            merge(existing, incoming) {
              let launches: Reference[] = [];
              if (existing && existing.launches) {
                launches = launches.concat(existing.launches);
              }
              if (incoming && incoming.launches) {
                launches = launches.concat(incoming.launches);
              }
              return {
                ...incoming,
                launches: uniqBy(launches, "__ref"),
              };
            },
          },
        },
      },
      LaunchConnect: {
        fields: {
          launches: {
            keyArgs: false,
            merge(existing, incoming) {
              let launches: Reference[] = [];
              if (existing) {
                launches = launches.concat(existing);
              }
              if (incoming) {
                launches = launches.concat(incoming);
              }
              return launches;
            },
          },
        },
      },
    },
  });
