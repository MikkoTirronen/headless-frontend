import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "../components/NavigationBar";
import { Navbar } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home({ posts, categories }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Head>
        <title>Headless CMS</title>
      </Head>
      
      <NavigationBar />
      <div className="container bg-dark text-light">
        <main id="#main-content" className="main">
          <div>
            <div className="d-flex justify-content-center flex-column">
              <h1 className="no-wrap m-auto mt-5">Headless Wordpress</h1>
              <div className="m-auto mt-3">
                <Navbar>
                  <p className="categories">Categories:</p>
                  {categories.map(({ name }, index) => (
                    <div key={index} className="categories">
                      <Link
                        href={{
                          pathname: `categories/${name}`,
                          query: name,
                        }}
                      >
                        <a>{name}</a>
                      </Link>
                    </div>
                  ))}
                </Navbar>
              </div>
              <div className="mt-3 input-group pe-5 ps-5 inputcss">
                <input
                  type="text"
                  value={searchValue}
                  placeholder="Enter value"
                  className="form-control"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Link
                  href={{
                    pathname: `search/${searchValue}`,
                    query: searchValue,
                  }}
                >
                  <a className="btn btn-primary">Search</a>
                </Link>
              </div>
              <ul id="#main-content" className="m-auto mt-3">
                {console.log(posts)}
                {posts.map(
                  ({ postId, slug, title, content, featuredImage, date }) => (
                    <li key={postId}>
                      <span>{date}</span>
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
                            />
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
        categories {
          nodes {
            name
          }
        }
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
      categories: result.data.categories.nodes,
    },
  };
}
