type FlowingMeshProps = {
  dark?: boolean;
};

export function FlowingMesh({ dark = false }: FlowingMeshProps) {
  const id = dark ? "dark" : "light";
  const verticalLines = Array.from({ length: 19 }, (_, index) => index);
  const horizontalLines = Array.from({ length: 11 }, (_, index) => index);

  return (
    <svg
      className={`flowing-mesh${dark ? " flowing-mesh-dark" : ""}`}
      viewBox="0 0 760 490"
      fill="none"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`mesh-line-${id}`} x1="60" y1="120" x2="680" y2="410" gradientUnits="userSpaceOnUse">
          <stop stopColor={dark ? "#32D9F5" : "#087BEE"} stopOpacity=".08" />
          <stop offset=".48" stopColor={dark ? "#32D9F5" : "#32D9F5"} stopOpacity={dark ? ".6" : ".48"} />
          <stop offset="1" stopColor={dark ? "#087BEE" : "#32D9F5"} stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={`ribbon-${id}`} x1="172" y1="90" x2="576" y2="404" gradientUnits="userSpaceOnUse">
          <stop stopColor="#087BEE" stopOpacity={dark ? ".3" : ".12"} />
          <stop offset=".48" stopColor="#32D9F5" stopOpacity={dark ? ".38" : ".2"} />
          <stop offset="1" stopColor="#087BEE" stopOpacity={dark ? ".1" : ".07"} />
        </linearGradient>
        <radialGradient id={`orb-${id}`} cx="0" cy="0" r="1" gradientTransform="matrix(124 130 -126 120 518 180)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#32D9F5" stopOpacity=".8" />
          <stop offset=".34" stopColor="#087BEE" stopOpacity=".48" />
          <stop offset="1" stopColor="#031344" stopOpacity="0" />
        </radialGradient>
        <filter id={`blur-${id}`} x="0" y="0" width="760" height="490" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>
      <ellipse cx="516" cy="193" rx="150" ry="134" fill={`url(#orb-${id})`} filter={`url(#blur-${id})`} opacity={dark ? ".86" : ".42"} />
      <path
        d="M-25 260C96 124 185 116 296 205c109 87 176 174 289 121 66-31 125-108 205-103v155c-107-15-163 44-270 52-147 11-214-105-330-108-75-2-145 43-215 102V260Z"
        fill={`url(#ribbon-${id})`}
        opacity={dark ? ".72" : ".72"}
      />
      <g stroke={`url(#mesh-line-${id})`} strokeWidth="1">
        {verticalLines.map((line) => {
          const x = -100 + line * 50;
          const lean = line * 6;
          return (
            <path
              key={`v-${line}`}
              d={`M${x} 60 C${x + 80 + lean} 170 ${x - 34 + lean} 295 ${x + 30} 460`}
            />
          );
        })}
        {horizontalLines.map((line) => {
          const y = 78 + line * 34;
          const peak = line % 2 === 0 ? -70 : 68;
          return (
            <path
              key={`h-${line}`}
              d={`M-30 ${y + 80} C150 ${y - 40 + peak} 268 ${y + 160} 392 ${y + 72}S605 ${y - 80 + peak} 790 ${y + 25}`}
            />
          );
        })}
      </g>
      <path
        d="M-12 293c123-117 169-133 277-62 123 82 158 163 275 133 77-20 142-88 236-74"
        stroke="#32D9F5"
        strokeOpacity={dark ? ".85" : ".5"}
        strokeWidth={dark ? "2" : "1.4"}
      />
    </svg>
  );
}
