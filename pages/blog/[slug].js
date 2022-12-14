import { gql } from "@apollo/client";
import { client } from "../../lib/apollo";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "../../components/NavigationBar";

export default function BlogPage({ post }) {
  return (
    <>
      <NavigationBar />
      <div className="container-fluid">
        <div className="container containerxtra d-flex flex-column p-5">
          <h1 className="pt-5 text-center">{post.title}</h1>
          {post.featuredImage !== null ? (
            <>
              <picture>
                <img
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                ></img>
              </picture>
            </>
          ) : (
            ""
          )}
          <div
            className="pt-3"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
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
          featuredImage {
            node {
              sourceUrl
            }
          }
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
