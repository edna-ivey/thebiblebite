import { useId } from "react";

type DigbyExpression = "default" | "celebrate" | "look-closer";

type DigbyMascotProps = {
  className?: string;
  expression?: DigbyExpression;
  label?: string;
};

const digbyBodyPath =
  "M17.5 57.5c0-12.4 4.4-22.9 12-30.4 2.6 3.4 8.2 2.8 9.5-1.6 3.1 3.8 9.9 2.4 10.8-3.2 3.5 2 8.9.7 12.1-3.3 22.9 1 40.3 16.8 40.3 36.3 0 25.3-18.6 43.7-43.6 43.7-24.7 0-41.1-17.6-41.1-41.5Z";

export function DigbyMascot({
  className,
  expression = "default",
  label = "Digby the Bite mascot",
}: DigbyMascotProps) {
  const bodyGradientId = useId();
  const edgeGradientId = useId();
  const mouthGradientId = useId();
  const isCelebrate = expression === "celebrate";
  const isLookCloser = expression === "look-closer";
  const eyeY = isCelebrate ? 43 : 43.5;
  const leftEyeX = isLookCloser ? 47.9 : 49;
  const rightEyeX = isLookCloser ? 72.9 : 74;
  const leftHighlightX = isLookCloser ? 46.4 : 47.1;
  const rightHighlightX = isLookCloser ? 71.4 : 72.1;

  return (
    <svg
      aria-label={label}
      className={className}
      role="img"
      viewBox="0 0 112 112"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient cx="63%" cy="31%" id={bodyGradientId} r="78%">
          <stop offset="0%" stopColor="#ffe797" />
          <stop offset="43%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="#ee8d16" />
        </radialGradient>
        <linearGradient id={edgeGradientId} x1="23" x2="54" y1="22" y2="94">
          <stop offset="0%" stopColor="#d98218" />
          <stop offset="100%" stopColor="#8f4e13" />
        </linearGradient>
        <linearGradient id={mouthGradientId} x1="58" x2="58" y1="52" y2="69">
          <stop offset="0%" stopColor="#2a160f" />
          <stop offset="100%" stopColor="#5b2014" />
        </linearGradient>
      </defs>

      <ellipse cx="58" cy="99" fill="rgba(104,61,20,0.16)" rx="30" ry="5.4" />

      <path d={digbyBodyPath} fill={`url(#${edgeGradientId})`} />
      <path
        d={digbyBodyPath}
        fill={`url(#${bodyGradientId})`}
        opacity="0.93"
        transform="translate(4.8 4.6) scale(0.92)"
      />

      <path
        d={digbyBodyPath}
        fill="none"
        stroke="#a45c13"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />

      <g aria-hidden="true">
        {isLookCloser ? (
          <>
            <path
              d="M43.4 33.8c2.8-2.8 6.6-3.3 9.9-1.2"
              fill="none"
              stroke="var(--ink)"
              strokeLinecap="round"
              strokeWidth="2.8"
            />
            <path
              d="M68.2 31.5c3.4-.6 6.4.6 8.2 3.1"
              fill="none"
              stroke="var(--ink)"
              strokeLinecap="round"
              strokeWidth="2.8"
            />
          </>
        ) : (
          <>
            <path
              d="M44.2 34.5c2.7-2.5 6.2-2.8 9.1-.8"
              fill="none"
              stroke="var(--ink)"
              strokeLinecap="round"
              strokeWidth="2.8"
            />
            <path
              d="M68.4 33.8c2.9-1.9 6.3-1.5 8.7 1"
              fill="none"
              stroke="var(--ink)"
              strokeLinecap="round"
              strokeWidth="2.8"
            />
          </>
        )}
        <ellipse cx={leftEyeX} cy={eyeY} fill="var(--ink)" rx="5.2" ry="6.4" />
        <ellipse cx={rightEyeX} cy={eyeY} fill="var(--ink)" rx="5.2" ry="6.4" />
        <circle cx={leftHighlightX} cy="41.4" fill="white" r="1.5" />
        <circle cx={rightHighlightX} cy="41.4" fill="white" r="1.5" />
        <path
          d={
            isLookCloser
              ? "M50.2 57.2c3 5.3 13.5 5.6 17.2 0"
              : isCelebrate
                ? "M46.2 54.6c2.9 13.5 21.1 13.9 25 0 0 0-4.8 4-12.7 4s-12.3-4-12.3-4Z"
                : "M47.2 55.5c2.4 12 19.7 12.4 23 0 0 0-4.2 3.2-11.7 3.2s-11.3-3.2-11.3-3.2Z"
          }
          fill={isLookCloser ? "none" : `url(#${mouthGradientId})`}
          stroke="var(--ink)"
          strokeLinecap={isLookCloser ? "round" : undefined}
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        {isLookCloser ? null : (
          <path
            d={
              isCelebrate
                ? "M52.8 65.8c3.2 2.6 8.9 2.7 12 0-1.7 3.9-10.1 4-12 0Z"
                : "M53.4 65.2c2.9 2.2 7.8 2.2 10.5 0-1.5 3.4-8.8 3.5-10.5 0Z"
            }
            fill="#ff7455"
          />
        )}
        <circle cx="39.2" cy="56.8" fill="#ff7b56" opacity="0.5" r="5" />
        <circle cx="83.2" cy="56.8" fill="#ff7b56" opacity="0.42" r="4.8" />
      </g>

      {isCelebrate ? (
        <g aria-hidden="true">
          <path
            d="M27.8 69.5c-5.1-2.2-7.9-6.3-8.8-11.2"
            fill="none"
            stroke="#d98218"
            strokeLinecap="round"
            strokeWidth="6"
          />
          <path
            d="M88.2 69.5c5.1-2.2 7.9-6.3 8.8-11.2"
            fill="none"
            stroke="#d98218"
            strokeLinecap="round"
            strokeWidth="6"
          />
          <circle cx="25.8" cy="68.8" fill="#e38d17" r="5.3" />
          <circle cx="90.2" cy="68.8" fill="#e38d17" r="5.3" />
        </g>
      ) : null}

      <g aria-hidden="true" transform="translate(57.5 81) scale(0.96)">
        <path
          d="M-5 1-31-10c-3.6 4.3-3.9 15.5-.3 20.2L-5 8.2V1Z"
          fill="var(--purple-dark)"
          stroke="#4c1c65"
          strokeLinejoin="round"
          strokeWidth="2.6"
        />
        <path
          d="M5 1 31-10c3.6 4.3 3.9 15.5.3 20.2L5 8.2V1Z"
          fill="var(--purple-dark)"
          stroke="#4c1c65"
          strokeLinejoin="round"
          strokeWidth="2.6"
        />
        <path
          d="M-26-5c4.6 2.4 9.7 3.2 15.2 2.5M10.8-2.5c5.5.7 10.6-.1 15.2-2.5"
          fill="none"
          opacity="0.35"
          stroke="#b56ad3"
          strokeLinecap="round"
          strokeWidth="2.1"
        />
        <rect
          fill="var(--purple)"
          height="23"
          rx="4.5"
          stroke="#4c1c65"
          strokeWidth="2.5"
          width="17"
          x="-8.5"
          y="-8"
        />
        <path d="M0 -2.8v12.1" stroke="#ffd66b" strokeLinecap="round" strokeWidth="3.6" />
        <path d="M-5 3.2h10" stroke="#ffd66b" strokeLinecap="round" strokeWidth="3.6" />
        <path
          d="M-5.4-5.2c2.8 1.2 6.4 1.1 10.8 0"
          fill="none"
          opacity="0.45"
          stroke="#b56ad3"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
