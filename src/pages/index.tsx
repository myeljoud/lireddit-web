import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Home: NextPage = () => {
  const [{ fetching, error, data }] = usePostsQuery();
  let state = null;
  if (fetching) {
    state = "Loading ...";
  } else if (data?.posts) {
    state = data.posts[0].title;
  } else if (error) {
    state = "Error ...";
  }

  return <Layout pageTitle="Home page">{state}</Layout>;
};

export default withUrqlClient(createUrqlClient)(Home);
