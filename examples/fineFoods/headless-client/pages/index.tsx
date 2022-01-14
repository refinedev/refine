import { LayoutWrapper } from "@pankod/refine-core";

import { Promotional } from "../components";

export const Home: React.FC = () => {
    return (
        <LayoutWrapper>
            <div className="container mx-auto">
                <Promotional />
            </div>
        </LayoutWrapper>
    );
};

export default Home;
