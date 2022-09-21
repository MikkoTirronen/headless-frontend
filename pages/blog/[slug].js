import { gql } from "@apollo/client";
import { client } from "../../lib/apollo";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Home.module.css";
import NavigationBar from "../components/NavigationBar";

export default function BlogPage({ post }) {
  return (
    <div className="container">
      <div className="row col-12">
        <div className="col-12">
          <NavigationBar/>
        </div>
      </div>
      <div className="row col-12">
        <div className="col-12">
          <h1 className={styles.title}>{post.title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-6">
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
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
