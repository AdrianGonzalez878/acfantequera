import { ImageResponse } from "next/og";

export const alt =
  "ACF Asesores y Consultores Fiscales de Antequera. Auditoría, impuestos y consultoría en Oaxaca y Puebla.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1B3F",
          color: "white",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 22,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#7EB6D9",
                fontFamily: "sans-serif",
                fontWeight: 700,
              }}
            >
              ACF
            </span>
            <span
              style={{
                marginTop: 8,
                fontSize: 18,
                color: "rgba(255,255,255,0.7)",
                fontFamily: "sans-serif",
              }}
            >
              Asesores y Consultores Fiscales de Antequera, S.C.
            </span>
          </div>
          <div
            style={{
              width: 72,
              height: 8,
              background: "#3D8EC9",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <span
            style={{
              fontSize: 58,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            Auditoría, impuestos y consultoría en Oaxaca y Puebla.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "sans-serif",
            fontSize: 20,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <span>Desde 2004 · Dictámenes IMSS, INFONAVIT y SHCP</span>
          <span>acfdeantequera.com</span>
        </div>
      </div>
    ),
    size,
  );
}
