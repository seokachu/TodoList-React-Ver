import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import "../../styles/common.css";

const Footer = () => {
  return (
    <footer className="footer">
      <address>
        <p>&copy;2024&#46;seokachu</p>
        <a
          href="https://github.com/seokachu/TodoList-React-Ver"
          target="_blank"
        >
          <FontAwesomeIcon icon={faSquareGithub} />
        </a>
      </address>
    </footer>
  );
};

export default Footer;
