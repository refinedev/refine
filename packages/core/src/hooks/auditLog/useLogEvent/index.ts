import { useContext } from "react";

import { AuditLogContext } from "@contexts/auditLog";
import { IAuditLogContext } from "../../../interfaces";

export const useLogEvent = () => {
    const liveContext = useContext<IAuditLogContext>(AuditLogContext);

    return liveContext?.logEvent;
};
