import { LayoutWrapper } from "@pankod/refine-core";

import { CheckoutProvider } from "@lib/context/checkout";
import CheckoutForm from "../CheckoutForm";
import CheckoutLoader from "../CheckoutLoader";
import CheckoutSummary from "../CheckoutSummary";

const CheckoutTemplate: React.FC = () => {
    return (
        <CheckoutProvider>
            <LayoutWrapper>
                <div className="small:min-h-screen relative bg-gray-100">
                    <div className="relative">
                        <CheckoutLoader />
                        <div className="small:grid-cols-[1fr_416px] content-container grid grid-cols-1 gap-y-8 gap-x-8 py-12">
                            <CheckoutForm />
                            <CheckoutSummary />
                        </div>
                    </div>
                </div>
            </LayoutWrapper>
        </CheckoutProvider>
    );
};

export default CheckoutTemplate;
