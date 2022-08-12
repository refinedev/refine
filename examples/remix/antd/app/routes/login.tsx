import { Login, action } from "~/pages/login";
import styles from "~/pages/login/styles.css";

export default Login;

export { action };

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}
