"use client";

import { DiscussionEmbed } from "disqus-react";
const Disqus = ({ id, title }) => {
  const disqusShortname = "cinematic-one";
  const disqusConfig = {
    url: `http://fandomlens.vercel.app/${id}`,
    identifier: id,
    title: title,
  };

  return (
    <div className="article-container font-sans">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
export { Disqus };
