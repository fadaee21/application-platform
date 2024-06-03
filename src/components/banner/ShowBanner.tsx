import BannerPLaceholder from "./BannerPLaceholder";

const ShowBanner = ({
  allBanner,
  height,
}: {
  allBanner: IBanner[];
  height?: string;
}) => {
  console.log({ allBanner });
  console.count("rendering");

  

  return (
    <div className="border border-slate-300">
      <BannerPLaceholder height={height} />
    </div>
  );
};

export default ShowBanner;
