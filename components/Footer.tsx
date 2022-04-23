import React from "react";
import Link from "next/link";
const Footer = (props) => (
  <small className="footer" {...props}>
    © Willie {new Date().getFullYear()}.
    <Link href="/feeds/atom.xml">
      <a>RSS</a>
    </Link>
  </small>
);
export default Footer;
