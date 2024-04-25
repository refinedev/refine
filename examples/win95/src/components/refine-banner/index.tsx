import { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export const RefineBanner = (props: Props) => {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  });

  const banner = BANNERS[bannerIndex];

  return (
    <a
      href={banner.href}
      target="_blank"
      rel="noreferrer"
      style={props.style}
      className={props.className}
    >
      <RefineBannerGif src={banner.img} alt="refine banner" />
    </a>
  );
};

const RefineBannerGif = styled.img`
  width: 784px;
  height: 120px;
`;

const BANNERS = [
  {
    img: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/refinecrm.gif",
    href: "https://refine.dev/templates/crm-application/",
  },
  {
    img: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/refinefoods.gif",
    href: "https://refine.dev/templates/react-admin-panel-ant-design/",
  },
];
