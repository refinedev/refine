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
                className="rounded-sm bg-blue-400 px-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
                Undo
            </button>
        </div>
    );
};
