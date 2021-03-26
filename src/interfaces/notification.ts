export interface INotification {
    id: string;
    resource: string;
    cancelMutation: () => void;
    seconds: number;
    isRunning: "new" | "running" | "ran";
}
