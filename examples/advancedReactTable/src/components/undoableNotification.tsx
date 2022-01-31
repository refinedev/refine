type UndoableNotification = {
    message: string;
    cancelMutation?: () => void;
    closeToast?: () => void;
};

export const UndoableNotification = ({
    closeToast,
    cancelMutation,
    message,
}: UndoableNotification) => {
    return (
        <div className="flex justify-between">
            <p>{message}</p>
            <button
                onClick={() => {
                    cancelMutation?.();
                    closeToast?.();
                }}
                className="px-2 font-semibold text-sm bg-blue-400 text-white rounded-sm shadow-sm hover:bg-blue-500"
            >
                Undo
            </button>
        </div>
    );
};
