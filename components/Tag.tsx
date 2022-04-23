import React, { ReactElement } from "react";
import Link from "next/link";

type TagProps = {
  tag: string;
};

const Tag = ({ tag }: TagProps): ReactElement => {
  return (
    <Link href={`/${tag}`}>
      <a>{tag}</a>
    </Link>
  );
};

export default Tag;
