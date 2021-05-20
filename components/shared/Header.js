import React, { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import ActiveLink from '@/components/shared/ActiveLink';
import { isAuthorized } from '@/utils/auth0';
import ReactResizeDetector from 'react-resize-detector';

const BsNavLink = (props) => {
  const { href, title, className = '' } = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  );
};

const LoginLink = () => <a href="/api/auth/login">Login</a>;

const LogoutLink = () => <a href="/api/auth/logout">Logout</a>;

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        Admin
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/portfolios/new"
            title="Create Portfolio"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/blogs/editor"
            title="Blog Editor"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/dashboard"
            title="Dashboard"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const Header = ({ user, loading, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <Navbar
          className={`port-navbar port-default absolute ${className} ${
            width < 768 && isOpen ? 'is-open' : 'is-close'
          }`}
          color="red"
          dark
          expand="md"
        >
          <div className="navbar-brand">
            <Link href="/">
              <a className="port-navbar-brand">Filip Jerga</a>
            </Link>
          </div>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/" title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/about" title="About" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/portfolios" title="Portfolios" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/blogs" title="Blogs" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/cv" title="Cv" />
              </NavItem>
            </Nav>
            <Nav navbar>
              {!loading && (
                <>
                  {user && (
                    <>
                      {isAuthorized(user, 'admin') && <AdminMenu />}
                      <NavItem className="port-navbar-item">
                        <LogoutLink />
                      </NavItem>
                    </>
                  )}
                  {!user && (
                    <NavItem className="port-navbar-item">
                      <LoginLink />
                    </NavItem>
                  )}
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </ReactResizeDetector>
  );
};

export default Header;
