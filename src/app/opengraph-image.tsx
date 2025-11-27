import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Dentalemon - Dental Practice Management Software";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "24px",
              fontSize: "48px",
            }}
          >
            🍋
          </div>
          <span
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Dentalemon
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: "24px",
            lineHeight: 1.2,
          }}
        >
          Dental Practice Management Software
        </div>

        {/* Subheading */}
        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Automate scheduling, billing, and patient records. HIPAA-compliant
          software built for modern dental practices.
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: "flex",
            marginTop: "48px",
            gap: "24px",
          }}
        >
          {["Scheduling", "Billing", "Patient Records", "HIPAA Compliant"].map(
            (feature) => (
              <div
                key={feature}
                style={{
                  padding: "12px 24px",
                  background: "rgba(251, 191, 36, 0.15)",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  borderRadius: "9999px",
                  color: "#fbbf24",
                  fontSize: "20px",
                }}
              >
                {feature}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
