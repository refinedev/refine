import { useEffect, useState } from "react";
import styled from "styled-components";

type Banner = "crm" | "finefoods";

type Props = {
  className?: string;
  banner: Banner;
  style?: React.CSSProperties;
};

export const RefineBanner = (props: Props) => {
  const selectedBanner = BANNERS[props.banner];

  return (
    <a
      href={selectedBanner.href}
      target="_blank"
      rel="noreferrer"
      style={props.style}
      className={props.className}
    >
      <RefineBannerGif src={selectedBanner.img} alt="refine banner" />
    </a>
  );
};

const RefineBannerGif = styled.img`
  width: 784px;
  height: 120px;
`;

const BANNERS: Record<Banner, { img: string; href: string }> = {
  crm: {
    img: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/refinecrm.gif",
    href: "https://refine.dev/templates/crm-application/",
  },
  finefoods: {
    img: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/refinefoods.gif",
    href: "https://refine.dev/templates/react-admin-panel-ant-design/",
  },
};
