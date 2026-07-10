import { ImageResponse } from "next/og";
import { DigbySiteIcon } from "@/components/DigbySiteIcon";

export const contentType = "image/png";

const browserIconSizes = {
  "32": {
    canvas: 32,
    frame: 32,
    treatment: "micro",
  },
  "64": {
    canvas: 64,
    frame: 56,
    treatment: "standard",
  },
} as const;

type BrowserIconId = keyof typeof browserIconSizes;

export function generateImageMetadata() {
  return [
    {
      contentType,
      id: "32",
      size: {
        height: browserIconSizes["32"].canvas,
        width: browserIconSizes["32"].canvas,
      },
    },
    {
      contentType,
      id: "64",
      size: {
        height: browserIconSizes["64"].canvas,
        width: browserIconSizes["64"].canvas,
      },
    },
  ];
}

export default function Icon({ id = "64" }: { id?: string }) {
  const iconId: BrowserIconId = id === "32" ? "32" : "64";
  const iconSize = browserIconSizes[iconId];

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "transparent",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            height: `${iconSize.frame}px`,
            width: `${iconSize.frame}px`,
          }}
        >
          <DigbySiteIcon sizeTreatment={iconSize.treatment} />
        </div>
      </div>
    ),
    {
      height: iconSize.canvas,
      width: iconSize.canvas,
    },
  );
}
