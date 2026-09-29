import { ImageResponse } from "next/og";

export const alt = "TopoStitch — One product. More ways to sell it.";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f5f3ec",
          color: "#171714",
          fontFamily: "Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "49%",
            height: "100%",
            padding: "72px 46px 58px 72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "-1.5px",
            }}
          >
            TopoStitch
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#67675f",
                marginBottom: 22,
              }}
            >
              For makers, brands, and sellers
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 64,
                lineHeight: 0.95,
                fontWeight: 800,
                letterSpacing: "-4px",
              }}
            >
              <span>One product.</span>
              <span>More ways</span>
              <span>
                to <span style={{ color: "#ff5a36" }}>sell it.</span>
              </span>
            </div>

            <div
              style={{
                marginTop: 32,
                maxWidth: 465,
                fontSize: 22,
                lineHeight: 1.35,
                color: "#67675f",
              }}
            >
              Product imagery, 3D, AR, social content, ads, and more from a
              single physical product.
            </div>
          </div>

          <div
            style={{
              fontSize: 17,
              color: "#67675f",
            }}
          >
            topostitch.dev
          </div>
        </div>

        <div
          style={{
            width: "51%",
            height: "100%",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <img
            src="https://www.topostitch.dev/hero_graphic.webp"
            width="612"
            height="630"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
