import Link from "next/link";

import { CheckoutProvider } from "@lib/context/checkout";
import { ChevronDown } from "@components/icons";
import CheckoutForm from "../CheckoutForm";
import CheckoutLoader from "../CheckoutLoader";
import CheckoutSummary from "../CheckoutSummary";

const CheckoutTemplate: React.FC = () => {
    return (
        <CheckoutProvider>
            <div className="small:min-h-screen relative bg-gray-100">
                <div className="h-16 bg-white">
                    <nav className="content-container flex h-full items-center justify-between">
                        <Link href="/cart">
                            <a className="text-small-semi flex flex-1 basis-0 items-center gap-x-2 uppercase text-gray-700">
                                <ChevronDown className="rotate-90" size={16} />
                                <span className="small:block mt-px hidden">
                                    Back to shopping cart
                                </span>
                                <span className="small:hidden mt-px block">
                                    Back
                                </span>
                            </a>
                        </Link>
                        <Link href="/">
                            <a className="text-xl-semi">ACME</a>
                        </Link>
                        <div className="flex-1 basis-0" />
                    </nav>
                </div>
                <div className="relative">
                    <CheckoutLoader />
                    <div className="small:grid-cols-[1fr_416px] content-container grid grid-cols-1 gap-y-8 gap-x-8 py-12">
                        <CheckoutForm />
                        <CheckoutSummary />
                    </div>
                </div>
                <div className="flex w-full items-center justify-center py-4">
                    <div className="flex w-full items-center justify-center py-4">
                        <div className="content-container flex flex-1 justify-center">
                            Refine
                        </div>
                    </div>
                </div>
            </div>
        </CheckoutProvider>
    );
};

export default CheckoutTemplate;
