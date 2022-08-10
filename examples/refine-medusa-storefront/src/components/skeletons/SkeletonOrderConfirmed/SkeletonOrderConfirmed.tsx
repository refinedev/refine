import SkeletonOrderConfirmedHeader from "../SkeletonOrderConfirmedHeader";
import SkeletonOrderInformation from "../SkeletonOrderInformation";
import SkeletonOrderItems from "../SkeletonOrderItems";

const SkeletonOrderConfirmed: React.FC = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] animate-pulse bg-gray-50 py-6">
            <div className="content-container flex justify-center">
                <div className="h-full w-full max-w-4xl bg-white p-10">
                    <SkeletonOrderConfirmedHeader />

                    <SkeletonOrderItems />

                    <SkeletonOrderInformation />
                </div>
            </div>
        </div>
    );
};

export default SkeletonOrderConfirmed;
