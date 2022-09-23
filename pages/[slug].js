import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import NavigationBar from "./components/NavigationBar";
import"bootstrap/dist/css/bootstrap.css"
export default function Page({ page }) {
  console.log(page);
  return (
    <>
      <NavigationBar/>
      <h1>{page[0].title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
    </>
  );
}
export async function getStaticPaths() {
  console.log("HELLO");
  const result = await client.query({
    query: gql`
      query GetWordPressData {
        pages {
          nodes {
            slug
          }
        }
      }
    `,
  });
  result && console.log(result.data.pages);
  return {
    paths: result.data.pages.nodes.map(({ slug }) => {
      return {
        params: { slug },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  console.log(String(slug))
  const result = await client.query({
    query: gql`
      query GetWordPressSlug{
        pages(where: { title: "${slug}" }) {
          nodes {
            slug
            title
            uri
          }
        }
      }
    `,
    variables: { slug },
  });

  result && console.log(result.data.nodes);
  return {
    props: {
      page: { ...result.data.pages.nodes },
    },
  };
}
