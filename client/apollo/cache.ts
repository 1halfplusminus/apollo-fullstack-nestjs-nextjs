import { InMemoryCache, makeVar, Reference } from "@apollo/client";
import { indexOf, take } from "lodash";
import first from "lodash/first";
import uniqBy from "lodash/uniqBy";

export var cartsVar = makeVar<string[]>([]);

export const createCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          carts: {
            read: (__, { variables: { id } }) => {
              return {
                ids: cartsVar(),
                inCart: indexOf(cartsVar(), id) !== -1,
              };
            },
          },
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
