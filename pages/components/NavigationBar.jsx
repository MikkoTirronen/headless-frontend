import React, { useState, useEffect } from "react";
import Link from "next/link";

import { Nav, Navbar } from "react-bootstrap";

export default function NavigationBar() {
  const [pathList, setPathList] = useState(null);

  //   useEffect(() => {
  //     fetch(`http://13.50.16.196/pages`)
  //       .then((res) => res.json())
  //       .then((data) => setPathList(data));
  //   }, []);

  useEffect(() => {
    fetch(`http://13.50.72.223/graphql`, {
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
                    slug
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
    <Navbar
      collapseOnSelect
      expand="md"
      className="navbar navbar-expand-md navbar-light bg-light vw-100"
    >
      <Navbar.Toggle
        aria-controls="navbarSupportedContent"
        data-bs-target="#navbarSupportedContent"
        aria-expanded="false"
        data-bs-toggle="collapse"
        aria-label="Toggle navigation"
      ></Navbar.Toggle>
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="container-fluid">
          <ul className="navbar-nav mb-lg-0 m-auto">
            <li>
              <Link href="/">
                <a className="nav-item">HOME</a>
              </Link>
            </li>
            {pathList &&
              pathList.data.pages.nodes.map((path, index) => {
                return (
                  <li key={path.id} className="nav-item ">
                    <Link
                      eventkey={`${index}`}
                      href={`/${encodeURIComponent(path.slug)}`}
                    >
                      <a className="nav-item">{path.slug.toUpperCase()}</a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
