import { FC } from 'react';
import { Navbar } from 'flowbite-react';
import MenuIcon from '../icon/MenuIcon';

const NavbarCustom: FC<{ title: string; onClickMenu: any }> = ({
  title,
  onClickMenu,
}) => {
  return (
    <div>
      <Navbar fluid={true} border={true}>
        <Navbar.Brand href='#'>
          <div className='mr-6' onClick={onClickMenu}>
            <MenuIcon />
          </div>
          <span className='self-center whitespace-nowrap text-xl font-semibold'>
            {title}
          </span>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default NavbarCustom;
