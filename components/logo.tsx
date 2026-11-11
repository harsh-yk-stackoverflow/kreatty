type LogoProps = {
  light?: boolean;
};

export function Logo({ light = false }: LogoProps) {
  return (
    <span className={`brand-mark${light ? " brand-mark-light" : ""}`}>
      <svg className="brand-symbol" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <path
          d="M17 2.5 31.5 11v12L17 31.5 2.5 23V11L17 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M11 22V12h5.5a3.5 3.5 0 0 1 0 7H11m7.5 3 4.5-5"
          stroke="url(#brand-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="brand-gradient" x1="11" y1="12" x2="24" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#087BEE" />
            <stop offset="1" stopColor="#32D9F5" />
          </linearGradient>
        </defs>
      </svg>
      <span className="brand-word">kreatty<span>.</span></span>
    </span>
  );
}
