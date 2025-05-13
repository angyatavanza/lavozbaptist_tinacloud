import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import React, { useId } from "react";

const shapes = [
  {
    width: 655,
    height: 680,
    path: "M537.827 9.245A11.5 11.5 0 ...", // truncated for brevity
  },
  {
    width: 719,
    height: 680,
    path: "M89.827 9.245A11.5 11.5 0 ...",
  },
  {
    width: 719,
    height: 680,
    path: "M632.827 9.245A11.5 11.5 0 ...",
  },
];

interface StylizedImageProps extends ImageProps {
  shape?: number;
  className?: string;
}

export const StylizedImage: React.FC<StylizedImageProps> = ({
  shape = 0,
  className,
  ...props
}) => {
  const id = useId();
  const { width, height, path } = shapes[shape];
  return (
    <div
      className={clsx(
        className,
        "relative flex aspect-[719/680] w-full grayscale"
      )}
    >
      <svg viewBox={`0 0 ${width} ${height}`} fill="none" className="h-full">
        <g clipPath={`url(#${id}-clip)`} className="group">
          <g className="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105">
            <foreignObject width={width} height={height}>
              <Image
                className="w-full bg-neutral-100 object-cover"
                style={{ aspectRatio: `${width} / ${height}` }}
                {...props}
              />
            </foreignObject>
          </g>
          <use
            href={`#${id}-shape`}
            strokeWidth="2"
            className="stroke-purple-800/10"
          />
        </g>
        <defs>
          <clipPath id={`${id}-clip`}>
            <path
              id={`${id}-shape`}
              d={path}
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

//export default StylizedImage;
