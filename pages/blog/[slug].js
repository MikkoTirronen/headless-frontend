import { gql } from "@apollo/client";
import { client } from "../../lib/apollo";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Home.module.css";
import NavigationBar from "../components/NavigationBar";

export default function BlogPage({ post }) {
  return (
    <>
      <NavigationBar />
      <div className="container d-flex flex-column justify-content-center">
        <h1 className="">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
      query GetWordPressData {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return {
    paths: result.data.posts.nodes.map(({ slug }) => {
      return {
        params: { slug },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const result = await client.query({
    query: gql`
      query GetWordPressSlug($slug: String!) {
        postBy(slug: $slug) {
          title
          content
        }
      }
    `,
    variables: { slug },
  });
  return {
    props: {
      post: result.data.postBy,
    },
  };
}
