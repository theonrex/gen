import React from 'react'
import Image from "next/image";
import logo from "../public/gr.png"


function NavbarMenu() {

  return (
    <>
      <nav className="navbar navbar-expand-lg   mb-4 " id="navbar">
        <div className='MID'>
        <div className="container-fluid container">
          <Link className="navbar-brand nav-link " href="/#">
            {" "}
            <Image
              src={logo}
              alt="logo"
              className="nav-logo"
            />
          </Link>
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbarExample-expand-lg"
            aria-controls="offcanvasNavbarExample-expand-lg"
            >
            <span
              className="navbar-toggler-icon"
              data-bs-target="#offcanvasNavbarExample-expand-lg"
              ></span>
          </button>
          
                  </div>
          <div
            className="navflex"
            data-bs-hideresize="true"
            tabIndex="-1"
            id="offcanvasNavbarExample-expand-lg"
            aria-labelledby="offcanvasNavbarExample-expand-lg"
          >
            <div className="">
              <h5 className="" id=""></h5>
              <button
                type="button"
                className="btn-close btn-close-white text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navtext navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" href="#products">
                    Products
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" href="/whyus">
                    About
                  </Link>
                </li>{" "}
                <li className="nav-item">
                  <Link className="nav-link" href="#Contact">
                    Contact
                  </Link>
                </li>{" "}
                <li className="nav-item vertical-line"></li>
                {/* <p>L</p> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarMenu