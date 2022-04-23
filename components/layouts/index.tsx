import Meta, { MetaProps } from "./Meta";
import React, { ReactElement, ReactNode } from "react";

type LayoutProps = MetaProps & {
  children: ReactNode;
};

const Layout = ({ children, ...meta }: LayoutProps): ReactElement => {
  return (
    <>
      <Meta {...meta} />
      <article className="container prose">{children}</article>
    </>
  );
};

export default Layout;
