import React, { useState, useEffect } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "../../components/NavigationBar";
import { useRouter } from "next/router";

export default function CategoryPage() {
  const router = useRouter();
  const data = router.query;
  const category = data.name;

  const [categoryData, setCategoryData] = useState(null);
  useEffect(() => {
    data &&
      fetch(`https://${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        {
          posts(where: {categoryName: "${category}"}) {
              nodes {
                date
                content
                postId
                slug
                title
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
            
          }}
        `,
        }),
      })
        .then((res) => res.json())
        .then((data) => setCategoryData(data.data.posts.nodes));
  }, []);
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="container containerxtra">
        <h1 className="text-center pt-5">Category: {data && category} </h1>

        {categoryData &&
          categoryData.map((post) => (
            <>
              <div className=" d-flex flex-column pe-5 ps-5">
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
            </>
          ))}
        <Link href="/">
          <a>
            <h3 className="text-center pb-5">Back to Home</h3>
          </a>
        </Link>
      </div>
    </>
  );
}
