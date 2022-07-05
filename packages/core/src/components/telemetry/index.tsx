import { useContext, useEffect } from "react";
import * as JSEncrypt from "jsencrypt";
import { stringify } from "qs";

import { AuthContext } from "@contexts/auth";
import { AuditLogContext } from "@contexts/auditLog";
import { LiveContext } from "@contexts/live";
import { RouterContext } from "@contexts/router";
import { DataContext } from "@contexts/data";
import { TranslationContext } from "@contexts/translation";
import { NotificationContext } from "@contexts/notification";
import { AccessControlContext } from "@contexts/accessControl";
import { useResource } from "@hooks/resource";

import { ITelemetryData } from "../../interfaces/telementry";

// It reads and updates from package.json during build. ref: tsup.config.ts
const REFINE_VERSION = "1.0.0";

const PUBLIC_KEY =
    "-----BEGIN PUBLIC KEY-----" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhZUdZYIyloRbQ+flNWC9Ysofo" +
    "abRH1+FD8iKRqIRouwoPWfaTUo3RrfMVGfyasxOERZzUQRwTGbekRJyrPGb7HH+p" +
    "z1yt+dzsvSshmJK6bh//Vo+4aMqNpKmTDnylmsPE0wqyarb0bXy/cP7TV38utf2J" +
    "b8SrOsqVAQdYgxHkNQIDAQAB" +
    "-----END PUBLIC KEY-----";

export const Telemetry: React.FC<{}> = () => {
    const authContext = useContext(AuthContext);
    const auditLogContext = useContext(AuditLogContext);
    const liveContext = useContext(LiveContext);
    const routerContext = useContext(RouterContext);
    const dataContext = useContext(DataContext);
    const i18nContext = useContext(TranslationContext);
    const notificationContext = useContext(NotificationContext);
    const accessControlContext = useContext(AccessControlContext);
    const { resources } = useResource();

    useEffect(() => {
        const auth = authContext.isProvided;
        const auditLog =
            !!auditLogContext.create ||
            !!auditLogContext.update ||
            !!auditLogContext.get;

        const live = !!liveContext;
        const router = !!routerContext;
        const data = !!dataContext;
        const i18n = !!i18nContext;
        const notification = !!notificationContext;
        const accessControl = !!accessControlContext;

        const payload: ITelemetryData = {
            auth,
            auditLog,
            live,
            router,
            data,
            i18n,
            notification,
            accessControl,
            version: REFINE_VERSION,
            resourceCount: resources.length,
        };

        // Encrypt the data
        const encrypt = new JSEncrypt.JSEncrypt();
        encrypt.setPublicKey(PUBLIC_KEY);

        // Send the data to the server
        fetch("http://localhost:3001/send", {
            headers: {
                Accept: "application/text",
                "Content-Type": "application/text",
            },
            method: "POST",
            body: encrypt.encrypt(stringify(payload)) as any,
        });
    }, []);

    return null;
};
