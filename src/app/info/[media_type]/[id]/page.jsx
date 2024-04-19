export default function Page({ params }) {
  return (
    <div className="text-white">
      <div className="w-2/3 border border-white">
        <iframe
          src={`https://vidsrc.to/embed/${params.media_type}/${params.id}`}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="Video Player"
        ></iframe>
      </div>{" "}
    </div>
  );
}
