/**
 * @author aliemir
 *
 * `resources` can be registered by
 * the `createResourceRoutes` functions, or
 * `resources` prop but it's not required
 * both ways, they can be accessed through `useResource` and alike,
 * which keeps the possibility of accessing them in `<Sider />` components
 * to compose the menu (which also can be passed as a prop to it)
 */

import { IResourceItem } from "..";

export type ResourceBindings = IResourceItem[];
