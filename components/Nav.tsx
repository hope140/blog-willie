import React, { ReactElement, ReactNode } from "react";
type NavProps = {
  children: ReactNode;
};
const Nav = ({ children, ...prop }: NavProps): ReactElement => (
  <div className="nav-line" {...prop}>
    <p className="app-title">Willie&#x27;s blog</p>
    {children}
  </div>
);

export default Nav;
