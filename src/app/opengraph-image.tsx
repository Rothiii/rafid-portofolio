import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rafid Al Khairy - Backend & DevOps Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#1c1c22",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 32, color: "#fbbf24", marginBottom: 24 }}>
          Rafid.
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 24,
          }}
        >
          Rafid Al Khairy
        </div>
        <div style={{ fontSize: 32, color: "#e5e5e5" }}>
          Backend & DevOps Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
