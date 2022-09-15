import { LayoutWrapper } from "@pankod/refine-core";

import { CheckoutForm, CheckoutLoader, CheckoutSummary } from "@components";
import { CheckoutProvider } from "@lib/context";

export const CheckoutTemplate: React.FC = () => {
    return (
        <CheckoutProvider>
            <LayoutWrapper>
                <div className="small:min-h-screen bg-primary relative">
                    <div className="relative">
                        <CheckoutLoader />
                        <div className="small:grid-cols-[1fr_416px] mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-y-8 gap-x-8 px-8 py-12">
                            <CheckoutForm />
                            <CheckoutSummary />
                        </div>
                    </div>
                </div>
            </LayoutWrapper>
        </CheckoutProvider>
    );
};
