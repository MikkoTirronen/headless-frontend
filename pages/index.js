import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wordpress Site</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>My Wordpress site!</h1>
        <p>here</p>
        <ul>
          {posts.map(({ postId, slug, title }) => (
            <li key={postId}>
              <Link href={`blog/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetWordPressPosts {
        posts {
          nodes {
            postId
            title
            uri
            slug
            excerpt
            date
            content
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
