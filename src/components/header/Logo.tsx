import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img className="h-8 w-auto " alt="logo" src="logo.svg" />
    </Link>
  );
}

export default Logo;
