import { ImageResponse } from "next/og";
import { BRAND, STORES } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #052e16 0%, #14532d 60%, #052e16 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.22)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(132,204,22,0.2)",
            filter: "blur(80px)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #16a34a, #84cc16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              color: "white",
            }}
          >
            Y
          </div>
          <span
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            {BRAND.name}
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            background: "linear-gradient(90deg, #4ade80, #84cc16)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {BRAND.tagline}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.55)",
            maxWidth: 640,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          Compare grocery prices across 5 stores. Let AI find your cheapest basket, cook your
          recipes, and track your nutrition.
        </div>

        {/* Platform pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {STORES.map((store) => (
            <div
              key={store}
              style={{
                padding: "10px 20px",
                borderRadius: 32,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {store}
            </div>
          ))}
        </div>

        {/* Company */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 80,
            fontSize: 16,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          {/* Single text child on purpose — satori throws on a multi-child div that
              lacks an explicit display value. */}
          {`${BRAND.company} · ${BRAND.siteUrl}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
