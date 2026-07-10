import { digbyBodyPath } from "@/components/DigbyMascot";

type DigbySiteIconProps = {
  background?: "transparent" | "cream";
  sizeTreatment?: "standard" | "micro";
  title?: string;
};

export function DigbySiteIcon({
  background = "transparent",
  sizeTreatment = "standard",
  title,
}: DigbySiteIconProps) {
  const isMicro = sizeTreatment === "micro";
  const iconViewBox = isMicro ? "12.5 15.5 91 86" : "0 0 112 112";
  const mascotTransform = "translate(0 0)";
  const bowTransform = isMicro ? "translate(57.5 82.2) scale(0.8)" : "translate(57.5 81) scale(0.96)";

  return (
    <svg
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
      height="100%"
      role={title ? "img" : undefined}
      viewBox={iconViewBox}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient cx="62%" cy="30%" id="digby-site-gold" r="80%">
          <stop offset="0%" stopColor="#ffe797" />
          <stop offset="46%" stopColor="#ffc43d" />
          <stop offset="100%" stopColor="#ee8d16" />
        </radialGradient>
        <linearGradient id="digby-site-edge" x1="23" x2="54" y1="22" y2="94">
          <stop offset="0%" stopColor="#d98218" />
          <stop offset="100%" stopColor="#8f4e13" />
        </linearGradient>
        <linearGradient id="digby-site-mouth" x1="58" x2="58" y1="52" y2="68">
          <stop offset="0%" stopColor="#2a160f" />
          <stop offset="100%" stopColor="#5b2014" />
        </linearGradient>
      </defs>

      {background === "cream" ? <rect fill="#fff5df" height="112" rx="22" width="112" /> : null}

      <g transform={mascotTransform}>
        {isMicro ? null : <ellipse cx="58" cy="99" fill="rgba(104,61,20,0.13)" rx="30" ry="5" />}
        <path d={digbyBodyPath} fill="url(#digby-site-edge)" />
        <path
          d={digbyBodyPath}
          fill="url(#digby-site-gold)"
          opacity="0.94"
          transform="translate(4.8 4.6) scale(0.92)"
        />
        <path
          d={digbyBodyPath}
          fill="none"
          stroke="#a45c13"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={isMicro ? "3.2" : "4"}
        />

        <path
          d="M44.2 34.5c2.7-2.5 6.2-2.8 9.1-.8"
          fill="none"
          stroke="#2a160f"
          strokeLinecap="round"
          strokeWidth={isMicro ? "3.1" : "2.8"}
        />
        <path
          d="M68.4 33.8c2.9-1.9 6.3-1.5 8.7 1"
          fill="none"
          stroke="#2a160f"
          strokeLinecap="round"
          strokeWidth={isMicro ? "3.1" : "2.8"}
        />
        <ellipse cx="49" cy="43.5" fill="#2a160f" rx="5.2" ry="6.4" />
        <ellipse cx="74" cy="43.5" fill="#2a160f" rx="5.2" ry="6.4" />
        {isMicro ? null : (
          <g>
            <circle cx="47.1" cy="41.4" fill="#ffffff" r="1.5" />
            <circle cx="72.1" cy="41.4" fill="#ffffff" r="1.5" />
          </g>
        )}
        <path
          d="M47.2 55.5c2.4 12 19.7 12.4 23 0 0 0-4.2 3.2-11.7 3.2s-11.3-3.2-11.3-3.2Z"
          fill="url(#digby-site-mouth)"
          stroke="#2a160f"
          strokeLinejoin="round"
          strokeWidth={isMicro ? "2.1" : "2.5"}
        />
        {isMicro ? null : (
          <g>
            <path
              d="M53.4 65.2c2.9 2.2 7.8 2.2 10.5 0-1.5 3.4-8.8 3.5-10.5 0Z"
              fill="#ff7455"
            />
            <circle cx="39.2" cy="56.8" fill="#ff7b56" opacity="0.52" r="5" />
            <circle cx="83.2" cy="56.8" fill="#ff7b56" opacity="0.44" r="4.8" />
          </g>
        )}

        <g aria-hidden="true" transform={bowTransform}>
          <path
            d={isMicro ? "M-5 2-26-7c-4 4.2-4 12.6 0 16.4L-5 6.7V2Z" : "M-5 1-31-10c-3.6 4.3-3.9 15.5-.3 20.2L-5 8.2V1Z"}
            fill="#6f2c91"
            stroke="#4c1c65"
            strokeLinejoin="round"
            strokeWidth={isMicro ? "3" : "2.6"}
          />
          <path
            d={isMicro ? "M5 2 26-7c4 4.2 4 12.6 0 16.4L5 6.7V2Z" : "M5 1 31-10c3.6 4.3 3.9 15.5.3 20.2L5 8.2V1Z"}
            fill="#6f2c91"
            stroke="#4c1c65"
            strokeLinejoin="round"
            strokeWidth={isMicro ? "3" : "2.6"}
          />
          <rect
            fill="#8d3db5"
            height={isMicro ? "20" : "23"}
            rx={isMicro ? "3.8" : "4.5"}
            stroke="#4c1c65"
            strokeWidth={isMicro ? "2.7" : "2.5"}
            width={isMicro ? "16" : "17"}
            x={isMicro ? "-8" : "-8.5"}
            y={isMicro ? "-7" : "-8"}
          />
          <path d="M0 -2.8v12.1" stroke="#ffd66b" strokeLinecap="round" strokeWidth={isMicro ? "3.9" : "3.6"} />
          <path d="M-5 3.2h10" stroke="#ffd66b" strokeLinecap="round" strokeWidth={isMicro ? "3.9" : "3.6"} />
        </g>
      </g>
    </svg>
  );
}
