import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "./image/STT-WHITE-LOGO.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };
  const [theme, setTheme] = useState("light-theme");
  const tongleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <>
      <nav class="navbar bg-light fixed-top">
        <div class="container-fluid">
          {/* Logo */}
          <div class="navbar-brand d-flex justify-content-between" href="#">
            <button
              class="navbar-toggler border-0 shadow-none d-block d-sm-block d-lg-none d-xl-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <img src={logo} alt="Shree tirupati textiles" className=""/>
            <Link to={"/"} className="btn border-0 fs-4 d-xl-none  d-lg-none bi bi-house"></Link>
          </div>
{/* Nav */}
          <ul class="nav">
            <li class="nav-item py-2">
              <a class="nav-link" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item py-2">
              <div class="dropdown">
                <button
                  class="btn nav-link dropdown-toggle border-0 "
                  type="button"
                >
                  Master
                </button>
                <ul class="dropdown-menu py-0 ">
                  <li>
                    {" "}
                    <Link to={"/city"} class="dropdown-item">
                      City
                    </Link>
                  </li>
                  <li>
                    <Link to={"/quality"} class="dropdown-item">
                      Quality
                    </Link>
                  </li>
                  <li>
                    <Link to={"/transport"} class="dropdown-item">
                      Transport
                    </Link>
                  </li>
                  <li>
                    <Link to={"/process"} class="dropdown-item">
                      Process
                    </Link>
                  </li>
                  <li>
                    <Link to={"/customer"} class="dropdown-item">
                      Customer
                    </Link>
                  </li>
                  <li>
                    <Link to={"/supplier"} class="dropdown-item">
                      Supplier
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item py-2">
              <div class="dropdown">
                <button
                  class="btn nav-link dropdown-toggle border-0"
                  type="button"
                >
                  Report
                </button>
                <ul class="dropdown-menu py-0">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item py-2">
              <a class="nav-link" href="#">
                Contact us
              </a>
            </li>
            <li class="nav-item py-2">
              <a class="nav-link" href="#">
                About
              </a>
            </li>
            <li class="nav-item d-flex d-none d-lg-block d-xl-block">
              <div class="dropdown">
                <button class="btn nav-link border-0 p-0 m-0 d-flex mx-3" type="button">
                    {/* <img class="rounded-5 border-2 d-none p-0 m-0" src="" alt="" /> */}
                    <i class="bi bi-person-circle fs-1"></i>
                    <div class="userName fw-bold mt-3 mx-2">Amit Pandey</div>
                  </button>
                <ul class="dropdown-menu py-0">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>         
        </div>
        {/* Side Nav */}
         <div
            class="offcanvas offcanvas-start bg-danger w-75"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
            <div class="offcanvas-header p-0">
              <div className="side-nav-userHeader border-bottom ">
                <div className="nav-userlogo">
                  <div className="nav-userImg">
                    <img src="" alt="" />
                  </div>
                  <div className="nav-userCameraBtn">
                    <i class="bi bi-camera"></i>
                  </div>
                </div>
                <div className="nav-userName text-white">
                  <span className="d-flex">
                    <b className="text-capitalize">user name :</b>
                    <p className="px-2 text-capitalize">amit pandey</p>
                  </span>
                </div>
              </div>
            </div>
            <div class="offcanvas-body nav-body p-0">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Master
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body p-0">
                      <ul class="list-group">
                        <Link to={"/city"} class="list-group-item">
                          City
                        </Link>
                        <Link to={"/transport"} class="list-group-item">
                          Transport
                        </Link>
                        <Link to={"/quality"} class="list-group-item">
                          Quality
                        </Link>                        
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Report
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body p-0">
                      <ul class="list-group">
                        <li class="list-group-item">Customer Wise Report</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                        <li class="list-group-item">A fourth item</li>
                        <li class="list-group-item">And a fifth one</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      Accordion Item #3
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      Placeholder content for this accordion, which is intended
                      to demonstrate the <code>.accordion-flush</code> class.
                      This is the third item's accordion body. Nothing more
                      exciting happening here in terms of content, but just
                      filling up the space to make it look, at least at first
                      glance, a bit more representative of how this would look
                      in a real-world application.
                    </div>
                  </div>
                </div>
              </div>
              <footer class="nav-footer text-white fixed-bottom p-3 d-flex justify-content-center ">
                <span className="w-100 ">
                  Made By Amit Pandey Copyright <i class="bi bi-c-circle"></i>{" "}
                  2023
                </span>
              </footer>
            </div>
          </div>
      </nav>
    </>
  );
}
