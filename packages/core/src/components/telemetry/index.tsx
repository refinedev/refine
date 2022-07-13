import { useEffect } from "react";
import { CompactEncrypt, importJWK } from "jose";

import { useTelemetryData } from "@hooks/useTelemetryData";

const PUBLIC_KEY = {
    kty: "RSA",
    e: "AQAB",
    use: "enc",
    alg: "RSA-OAEP-256",
    n: "glC_mSwk1VqaofnOPXK3HEC5njb4uHZM5_shFdQLRn_898dxVUMK7HkyOgoVOtEsNxDBjwK_KPbSEYX_lyfrJ6ONjnxPJ2_d0W_1ZwdwT_gr5ofFLz5Bm7WbVHcKDK1j5iMYsqUJbFVQ-KXzAswae2iiqzCBKLD4y-fLsIvOUGZliERMMi54hRPqVj6p0xhJEvH22jZ5rk48KJBNvjBBuLes1qk5cehirDHnh07A8Alr3Pe6Qk7xpyC_mUvMqX99JvYThyvjQMMPEXHLJY9m1g-sgHJPlMkxMoLUd5JI1v6QMLezhq2F-bNXiRgXJgT0ew3g-H_PKpWmMQmSRtgiEw",
};

export const Telemetry: React.FC<{}> = () => {
    const payload = useTelemetryData();

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        (async () => {
            const jwk = await importJWK(PUBLIC_KEY);

            const encryptedPayload = await new CompactEncrypt(
                new TextEncoder().encode(JSON.stringify(payload)),
            )
                .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
                .encrypt(jwk);

            fetch("https://telemetry.refine.dev/send", {
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
