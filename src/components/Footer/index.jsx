import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";

import "./footer.scss";

function Footer() {
  return (
    <footer>
      <div className="social-medias">
        Gabriel Moura
        <div>
          <FaGithub color="#b6b6b6" />
          <a
            href="https://github.com/gbmouraa"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div>
          <FaLinkedinIn color="#b6b6b6" />
          <a
            href="https://www.linkedin.com/in/gabriel-moura-b63382161/"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>
        </div>
        <div>
          <TfiWorld color="#b6b6b6" />
          <a
            href="https://gmouradev.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Porfólio
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
