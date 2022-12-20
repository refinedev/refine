import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
// import { Lazy, Navigation, Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

import { CompanyDetail } from "./company-detail";
import { GiftCard } from "./gift-card";

import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";

const UseCaseDetail = (props) => {
    const { data } = props;

    return (
        <Layout>
            <Head title={`${data.title} | refine`}>
                <html data-page="use-cases-detail" data-customized="true" />
            </Head>
            <div className="container max-w-[1040px]">
                <br />
                <CompanyDetail companyDetails={data.companyDetails} />
                <br />
                <br />
                {data.contents.map((content, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-6"
                    >
                        <div className="col-span-2 font-montserrat text-[#565662] font-bold text-xl md:text-lg">
                            {content.question}
                        </div>
                        <div className="col-span-4">
                            {content.answer.map((parahraph, index) => (
                                <p
                                    key={index}
                                    className="font-montserrat text-[#242436] font-medium mb-2"
                                    dangerouslySetInnerHTML={{
                                        __html: parahraph,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
                {/* <Swiper
                    style={{
                        "--swiper-navigation-color": "#1890FF",
                        "--swiper-pagination-color": "#1890FF",
                    }}
                    modules={[Lazy, Navigation, Pagination]}
                    lazy
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {data.assets.map((asset, index) => (
                        <SwiperSlide key={index}>
                            {asset.type === "image" && (
                                <>
                                    <img
                                        className="swiper-lazy"
                                        src={asset.url}
                                    />
                                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                </>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper> */}
                <br />
                <br />
                <GiftCard />
                <br />
                <br />
            </div>
        </Layout>
    );
};

export default UseCaseDetail;
