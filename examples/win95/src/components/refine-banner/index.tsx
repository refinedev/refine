import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCdnUrl } from "../../utils/get-cdn-url";

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
    img: getCdnUrl("/refinecrm.gif"),
    href: "https://refine.dev/templates/crm-application/",
  },
  finefoods: {
    img: getCdnUrl("/refinefoods.gif"),
    href: "https://refine.dev/templates/react-admin-panel-ant-design/",
  },
};
