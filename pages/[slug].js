import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import NavigationBar from "../components/NavigationBar";
import "bootstrap/dist/css/bootstrap.css";
export default function Page({ page }) {
  return (
    <div className="">
      <NavigationBar />

      <main className="container bg-dark text-light containerfix">
        <div className="container-fluid pt-5 ">
          <div className=" d-flex flex-column align-content-left">
            <ul className="m-auto">
              <h1 className="no-wrap m-auto pb-3 text-center">{page.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
            </ul>
          </div>
        </div>
      </main>
    </div>
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
  console.log(String(slug));
  const result = await client.query({
    query: gql`
      query GetWordPressSlug{
        pages(where: { title: "${slug}" }) {
          nodes {
            slug
            title
            uri
            content
          }
        }
      }
    `,
    variables: { slug },
  });

  result && console.log(result.data.pages);
  return {
    props: {
      page: { ...result.data.pages.nodes[0] },
    },
  };
}
