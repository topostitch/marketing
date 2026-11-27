export default function CoverageDiagram() {
  return (
    <figure>
      <svg
        viewBox="0 0 480 240"
        role="img"
        aria-labelledby="coverage-title coverage-description"
        style={{
          width: "100%",
          height: "auto",
          background: "#ebe8dd",
          borderRadius: 12,
        }}
      >
        <title id="coverage-title">Connected viewpoints around a product</title>
        <desc id="coverage-description">
          An original schematic showing a product at the center and eight
          surrounding camera positions, with a second higher ring suggested.
          This is a planning aid, not a required image count.
        </desc>
        <ellipse
          cx="240"
          cy="115"
          rx="170"
          ry="70"
          fill="none"
          stroke="#575950"
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <rect x="211" y="76" width="58" height="78" rx="8" fill="#575950" />
        {[
          [70, 115],
          [120, 65],
          [240, 45],
          [360, 65],
          [410, 115],
          [360, 165],
          [240, 185],
          [120, 165],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2="240" y2="115" stroke="#79796f" />
            <circle cx={x} cy={y} r="8" fill="#171714" />
          </g>
        ))}
        <text x="240" y="225" textAnchor="middle" fontSize="15" fill="#171714">
          Repeat connected views at different heights
        </text>
      </svg>
      <figcaption>
        Original TopoStitch schematic. Camera positions are illustrative; this
        is not a required image count.
      </figcaption>
    </figure>
  );
}
