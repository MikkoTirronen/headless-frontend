import React, { useState, useEffect } from "react";
import Link from "next/link";
import path from "path";

export default function Navbar() {
  const [pathList, setPathList] = useState(null);

  //   useEffect(() => {
  //     fetch(`http://13.50.16.196/pages`)
  //       .then((res) => res.json())
  //       .then((data) => setPathList(data));
  //   }, []);

  useEffect(() => {
    fetch(`http://13.50.16.196/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
            pages {
                nodes {
                    id
                    title
                }
            }
        }
    `,
      }),
    })
      .then((res) => res.json())
      .then((data) => setPathList(data));
  }, []);

  return (
    <div>
      <nav className="navbar fixed-top bg-light">
        <nav className="navbar ">
          <div className="container-fluid vw-100 justify-content-center">
            
              {pathList && (
              <>
                {pathList.data.pages.nodes.map((path) => {
                  return (
                    <div key={path.id}>
                      <Link href={`/${path.title.toLowerCase()}`}>
                        <a className="navbar-brand nav-item">{path.title}</a>
                      </Link>
                    </div>
                  );
                })}
              </>
            )}
            <form className="d-flex ms-5" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            
          
            
          </div>
        </nav>
      </nav>
    </div>
  );
}
