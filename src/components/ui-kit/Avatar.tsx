const Avatar = ({ src }: { src: string }) => {
  return (
    <div className="flex -space-x-1 overflow-hidden">
      <img
        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
        src={src}
        alt="av"
      />
    </div>
  );
};

export default Avatar;
