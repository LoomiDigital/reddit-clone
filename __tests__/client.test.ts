import React from "react";
import {
  initializeApollo,
  addApolloState,
  useApollo,
  createApolloClient,
} from "../graphql/client";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

describe("initializeApollo", () => {
  it("should return an instance of ApolloClient", () => {
    const apolloClient = initializeApollo();

    expect(apolloClient).toBeDefined();
    expect(apolloClient.constructor.name).toBe("ApolloClient");
  });

  it("should initialize with the provided initialState", () => {
    const initialState = {
      post: {
        id: "1",
        title: "Test Post",
      },
    };
    const apolloClient = initializeApollo({ initialState });
    const cacheData = apolloClient.cache.extract();

    expect(cacheData).toEqual({ initialState });
  });
});

describe("createApolloClient", () => {
  it("should return an instance of ApolloClient", () => {
    const client = createApolloClient();

    expect(client).toBeInstanceOf(ApolloClient<NormalizedCacheObject>);
  });
});

describe("addApolloState", () => {
  it("should add the Apollo cache state to pageProps", () => {
    const client: ApolloClient<NormalizedCacheObject>["localState"] = {
      cache: { extract: jest.fn(() => "cacheData") },
    };
    const pageProps = { props: {} };

    const updatedPageProps = addApolloState(client, pageProps);

    expect(updatedPageProps.props.__APOLLO_STATE__).toBe("cacheData");
    expect(client.cache.extract).toHaveBeenCalled();
  });

  it("should not modify pageProps if pageProps.props is not defined", () => {
    const client: ApolloClient<NormalizedCacheObject>["localState"] = {
      cache: { extract: jest.fn(() => "cacheData") },
    };
    const pageProps = {};
    const updatedPageProps = addApolloState(client, pageProps);

    expect(updatedPageProps).toBe(pageProps);
    expect(client.cache.extract).not.toHaveBeenCalled();
  });
});

describe("useApollo", () => {
  const mockUseMemo = jest.spyOn(React, "useMemo");

  it("should initialize Apollo store with the provided state", () => {
    const state = {
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: "no-cache",
        },
      },
    };

    mockUseMemo.mockImplementationOnce(() => state);

    const pageProps = { __APOLLO_STATE__: state };
    const apollo = useApollo({ pageProps });

    expect(apollo).toBeDefined();
    expect(apollo).toEqual(state);
  });

  it("should initialize Apollo store without any state if pageProps.__APOLLO_STATE__ is not defined", () => {
    const state = {
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: "no-cache",
        },
      },
    };

    mockUseMemo.mockImplementationOnce(() => state);

    const pageProps = {};
    const apollo = useApollo({ pageProps });

    expect(apollo).toBeDefined();
    expect(apollo).toEqual(state);
  });
});
