import React, { useState, useEffect } from "react";
import Link from "next/link";

import { Nav, Navbar, NavLink } from "react-bootstrap";

export default function NavigationBar() {
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
    //     <nav class="navbar navbar-expand-md navbar-light bg-light">
    //   <div class="container-fluid">
    // <a class="navbar-brand" href="#">Navbar</a>
    // <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //   <span class="navbar-toggler-icon"></span>
    // </button>
    // <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //   <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    //     <li class="nav-item">
    //       <a class="nav-link active" aria-current="page" href="#">Home</a>
    //     </li>
    //     <li class="nav-item">
    //       <a class="nav-link" href="#">Link</a>
    //     </li>
    //     <li class="nav-item dropdown">
    //       <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //         Dropdown
    //       </a>
    //       <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    //         <li><a class="dropdown-item" href="#">Action</a></li>
    //         <li><a class="dropdown-item" href="#">Another action</a></li>
    //         <li><hr class="dropdown-divider"/></li>
    //         <li><a class="dropdown-item" href="#">Something else here</a></li>
    //       </ul>
    //     </li>
    //     <li class="nav-item">
    //       <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    //     </li>
    //   </ul>
    //   <form class="d-flex">
    //     <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
    //     <button class="btn btn-outline-success" type="submit">Search</button>
    //   </form>
    // </div>
    //   </div>
    // </nav>

    <Navbar
      collapseOnSelect
      expand="md"
      className="navbar navbar-expand-md navbar-light bg-light vw-80"
    >
      <Navbar.Toggle
        aria-controls="navbarSupportedContent"
        data-bs-target="#navbarSupportedContent"
        aria-expanded="false"
        data-bs-toggle="collapse"
        aria-label="Toggle navigation"
      ></Navbar.Toggle>
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav>
          <ul className="navbar-nav m-auto mb-6 mb-lg-0">
            <a className="navbar-brand " href="#">
              Navbar:
            </a>
            {pathList &&
              pathList.data.pages.nodes.map((path, index) => {
                return (
                  <li key={path.id} className="nav-item">
                    <Link
                      eventkey={`${index}`}
                      href={`/${path.title.toLowerCase()}`}
                    >
                      <a className="nav-item">{path.title}</a>
                    </Link>
                  </li>
                );
              })}
          </ul>
          {/* <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    // <nav className="navbar fixed-top bg-light">
    //   <nav className="navbar ">
    //     <div className="container-fluid vw-100 justify-content-center">

    //         {pathList && (
    //         <>
    //           {pathList.data.pages.nodes.map((path) => {
    //             return (
    //               <div key={path.id}>
    //                 <Link href={`/${path.title.toLowerCase()}`}>
    //                   <a className="navbar-brand nav-item">{path.title}</a>
    //                 </Link>
    //               </div>
    //             );
    //           })}
    //         </>
    //       )}
    //       <form className="d-flex ms-5" role="search">
    //         <input
    //           className="form-control me-2"
    //           type="search"
    //           placeholder="Search"
    //           aria-label="Search"
    //         />
    //         <button className="btn btn-outline-success" type="submit">
    //           Search
    //         </button>
    //       </form>

    //     </div>
    //   </nav>
    // </nav>
  );
}
