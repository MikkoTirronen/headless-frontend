import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Wordpress Site</title>
      </Head>
      <NavigationBar />
      <div className="container bg-dark text-light">
        <main className="main">
          <div>
            <div className="d-flex justify-content-center flex-column">
              <h1 className="no-wrap m-auto mt-5">My Wordpress site!</h1>

              <ul className="m-auto mt-3">
                {console.log(posts)}
                {posts.map(
                  ({ postId, slug, title, content, featuredImage }) => (
                    <li key={postId}>
                      <h4>
                        <Link href={`blog/${slug}`}>
                          <a>{title}</a>
                        </Link>
                      </h4>

                      {featuredImage !== null ? (
                        <>
                          <picture>
                            <img
                              src={featuredImage.node.sourceUrl}
                              alt={title}
                            ></img>
                          </picture>
                        </>
                      ) : (
                        ""
                      )}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: content,
                        }}
                      ></div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetWordPressPosts {
        posts {
          nodes {
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
            date
            slug
            uri
            title
            postId
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: result.data.posts.nodes,
    },
  };
}
