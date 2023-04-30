import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import "../css/Footer.css";

const Footer = () => {
    var date = new Date();
    var year = date.getFullYear();

  return (
    <>
      <footer>
        <div className="footer">
          <ul className="socials">
            <li>
              <a href="https://www.google.com/">
              <i class="fa fa-facebook"></i>

              </a>
            </li>
            <li>
              <a href="https://www.google.com/">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/saniaahmad6/VitalDrop_">
                <i className="fa fa-github"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/computerengg-jmi/?trk=public_profile_browsemap&originalSubdomain=in">
                <i className="fa fa-linkedin-square"></i>
              </a>
            </li>
            <li>
              <a href="https://www.google.com/">
                <i className="fa fa-instagram"></i>
              </a>
            </li>
          </ul>
          <div className="footer-copyright">
            <p className="copyright">copyright &copy; {year} </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;