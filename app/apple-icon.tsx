import { ImageResponse } from "next/og";
import { DigbySiteIcon } from "@/components/DigbySiteIcon";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fff5df",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "146px",
            width: "146px",
          }}
        >
          <DigbySiteIcon />
        </div>
      </div>
    ),
    size,
  );
}
