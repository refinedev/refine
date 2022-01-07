export interface INotification {
    id: string;
    resource: string;
    cancelMutation: () => void;
    doMutation: () => void;
    seconds: number;
    isRunning: boolean;
    isSilent: boolean;
}
