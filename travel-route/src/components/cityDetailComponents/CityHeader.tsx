export const CityHeader = ({
  thumbnail,
  title,
}: {
  thumbnail: string | null | undefined;
  title: string;
}) => {
  return (
    <div className="w-full">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-100 object-cover shadow-lg"
        />
      )}
    </div>
  );
};
