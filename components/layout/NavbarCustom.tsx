import { FC } from "react";
import { Navbar } from "flowbite-react";

const NavbarCustom: FC<{ title: string }> = ({ title }) => {
  return (
    <div>
      <Navbar fluid={true} border={true}>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            {title}
          </span>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default NavbarCustom;
