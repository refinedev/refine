import { useContext, useEffect } from "react";
import { CompactEncrypt, importJWK } from "jose";

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
        if (
            typeof window === "undefined" ||
            process.env.NODE_ENV !== "production"
        ) {
            return;
        }

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
            providers: {
                auth,
                auditLog,
                live,
                router,
                data,
                i18n,
                notification,
                accessControl,
            },
            version: REFINE_VERSION,
            resourceCount: resources.length,
        };

        (async () => {
            const publicKey = await importJWK({
                kty: "RSA",
                e: "AQAB",
                use: "enc",
                alg: "RSA-OAEP-256",
                n: "glC_mSwk1VqaofnOPXK3HEC5njb4uHZM5_shFdQLRn_898dxVUMK7HkyOgoVOtEsNxDBjwK_KPbSEYX_lyfrJ6ONjnxPJ2_d0W_1ZwdwT_gr5ofFLz5Bm7WbVHcKDK1j5iMYsqUJbFVQ-KXzAswae2iiqzCBKLD4y-fLsIvOUGZliERMMi54hRPqVj6p0xhJEvH22jZ5rk48KJBNvjBBuLes1qk5cehirDHnh07A8Alr3Pe6Qk7xpyC_mUvMqX99JvYThyvjQMMPEXHLJY9m1g-sgHJPlMkxMoLUd5JI1v6QMLezhq2F-bNXiRgXJgT0ew3g-H_PKpWmMQmSRtgiEw",
            });

            const encryptedPayload = await new CompactEncrypt(
                new TextEncoder().encode(JSON.stringify(payload)),
            )
                .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
                .encrypt(publicKey);

            // https://telemetry.refine.dev/send
            fetch("http://localhost:3001/send", {
                headers: {
                    Accept: "application/text",
                    "Content-Type": "application/text",
                },
                method: "POST",
                body: encryptedPayload,
            });
        })();
    }, []);

    return null;
};
