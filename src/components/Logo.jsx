import { useId } from 'react'
import '../styles/logo.css'

export default function Logo({ animated = true }) {
  // Hardcoded per design spec
  const strokeWidth = 4

  // Brand palette (exact hex values)
  const colorBackground = '#0A1120' // shadow tint under the center icon
  const colorSurface = '#111A2E' // full logo backdrop (self-contained for header/favicon/DP use)
  const colorText = '#F5F7FF' // bright traveling trace head
  const colorSecondary = '#8892AC' // inner ring (muted, distinct from outer ring at any size)
  const colorAccent = '#8FAEFF' // outer ring
  const colorAccentActive = '#6C97F7' // center icon (settled color, richer than the outer ring)
  const outerCircumference = 2 * Math.PI * 75 // ~471.24

  const oArc = (outerCircumference * 120) / 360
  const oGap = (outerCircumference * 60) / 360
  const outerDashArray = `${oArc.toFixed(2)} ${oGap.toFixed(2)}`

  const uniqueId = 'kryzect-logo-' + useId().replace(/[^a-zA-Z0-9_-]/g, '')

  // Decaying "extra spin" duration layered on top of the always-running base
  // rotation, so there is no hard cut / rest between "intro" and "idle".

  // Approximate path lengths for the four center shapes, used so the trace
  // reveal is actually proportional to each shape instead of a blanket value.

  // One continuous pencil stroke through the whole icon: line -> diamond ->
  // upper arc -> lower arc, each segment starting exactly where the last
  // one finished (no overlap, no simultaneous bursts).

  // Bright pencil-tip length for each segment (short relative to its shape).

  // Slightly bolder center strokes for a crisper, more "HD" feel.
  const centerStrokeWidth = strokeWidth * 1.15
  const centerGlowStrokeWidth = strokeWidth * 1.45

  return (
    <svg
      key={uniqueId}
      className={`logo-root${animated ? '' : ' logo-root--static'}`}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id={`glow-${uniqueId}`}
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="0.5"
            result="coreBlur"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="2.2"
            result="haloBlur"
          />
          <feMerge>
            <feMergeNode in="haloBlur" />
            <feMergeNode in="coreBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Backdrop - full logo sits on its own surface, so it's self-contained wherever it's placed (header, favicon, social DP) */}
      <rect
        x="0"
        y="0"
        width="200"
        height="200"
        rx="32"
        ry="32"
        fill={colorSurface}
      />

      {/* Outer Evolving System - Thicker stroke width (1.5x) */}
      <g className="track-outer-base">
        <g className="track-outer-decay">
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke={colorAccent}
            strokeWidth={strokeWidth * 1.5}
            strokeDasharray={outerDashArray}
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Inner Track - solid (no gaps), static: rotating a complete circle shows no visible movement */}
      <circle
        cx="100"
        cy="100"
        r="55"
        fill="none"
        stroke={colorSecondary}
        strokeWidth={strokeWidth * 1.5} /* solid line */
      />

      {/* Stable Center - base shapes trace in, bright head runs the boundary then fades */}
      <g className="center-group">
        {/* Depth layer - dark, offset down-right: the "side face" of the extrusion */}
        <polygon
          className="trace-diamond"
          points="85,92 93,100 85,108 77,100"
          fill="none"
          stroke={colorBackground}
          strokeWidth={centerStrokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          transform="translate(1.3, 1.6)"
        />
        <line
          className="trace-line"
          x1="77"
          y1="70"
          x2="77"
          y2="130"
          stroke={colorBackground}
          strokeWidth={centerStrokeWidth}
          strokeLinecap="round"
          transform="translate(1.3, 1.6)"
        />
        <path
          className="trace-arc-up"
          d="M 89 96 A 55 55 0 0 1 132 75"
          fill="none"
          stroke={colorBackground}
          strokeWidth={centerStrokeWidth}
          strokeLinecap="round"
          transform="translate(1.3, 1.6)"
        />
        <path
          className="trace-arc-down"
          d="M 89 104 A 55 55 0 0 0 132 129"
          fill="none"
          stroke={colorBackground}
          strokeWidth={centerStrokeWidth}
          strokeLinecap="round"
          transform="translate(1.3, 1.6)"
        />

        {/* Main colored face */}
        <polygon
          className="trace-diamond"
          points="85,92 93,100 85,108 77,100"
          fill="none"
          stroke={colorAccentActive}
          strokeWidth={centerStrokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <line
          className="trace-line"
          x1="77"
          y1="70"
          x2="77"
          y2="130"
          stroke={colorAccentActive}
          strokeWidth={centerStrokeWidth}
          strokeLinecap="round"
        />
        {/* Upper Arc Branch */}
        <path
          className="trace-arc-up"
          d="M 89 96 A 55 55 0 0 1 132 75"
          fill="none"
          stroke={colorAccentActive}
          strokeWidth={centerStrokeWidth}
          strokeLinecap="round"
        />
        {/* Lower Arc Branch */}
        <path
          className="trace-arc-down"
          d="M 89 104 A 55 55 0 0 0 132 129"
          fill="none"
          stroke={colorAccentActive}
          strokeWidth={centerStrokeWidth}
          strokeLinecap="round"
        />

        {/* Highlight edge - light, thin, offset up-left: where the light catches the raised edge */}
        <polygon
          className="trace-diamond"
          points="85,92 93,100 85,108 77,100"
          fill="none"
          stroke={colorAccent}
          strokeWidth={centerStrokeWidth * 0.4}
          strokeLinejoin="round"
          strokeLinecap="round"
          transform="translate(-0.6, -0.8)"
        />
        <line
          className="trace-line"
          x1="77"
          y1="70"
          x2="77"
          y2="130"
          stroke={colorAccent}
          strokeWidth={centerStrokeWidth * 0.4}
          strokeLinecap="round"
          transform="translate(-0.6, -0.8)"
        />
        <path
          className="trace-arc-up"
          d="M 89 96 A 55 55 0 0 1 132 75"
          fill="none"
          stroke={colorAccent}
          strokeWidth={centerStrokeWidth * 0.4}
          strokeLinecap="round"
          transform="translate(-0.6, -0.8)"
        />
        <path
          className="trace-arc-down"
          d="M 89 104 A 55 55 0 0 0 132 129"
          fill="none"
          stroke={colorAccent}
          strokeWidth={centerStrokeWidth * 0.4}
          strokeLinecap="round"
          transform="translate(-0.6, -0.8)"
        />

        {/* Bright traveling heads from the original brand animation. */}
        <g filter={`url(#glow-${uniqueId})`}>
          <polygon
            className="glow-diamond"
            points="85,92 93,100 85,108 77,100"
            fill="none"
            stroke={colorText}
            strokeWidth={centerGlowStrokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <line
            className="glow-line"
            x1="77"
            y1="70"
            x2="77"
            y2="130"
            stroke={colorText}
            strokeWidth={centerGlowStrokeWidth}
            strokeLinecap="round"
          />
          <path
            className="glow-arc-up"
            d="M 89 96 A 55 55 0 0 1 132 75"
            fill="none"
            stroke={colorText}
            strokeWidth={centerGlowStrokeWidth}
            strokeLinecap="round"
          />
          <path
            className="glow-arc-down"
            d="M 89 104 A 55 55 0 0 0 132 129"
            fill="none"
            stroke={colorText}
            strokeWidth={centerGlowStrokeWidth}
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  )
}
