import { useCallback } from "react";

import { useNavigation } from "@hooks";

import type { BaseKey, MetaQuery } from "../../contexts/data/types";
import type { IResourceItem } from "../../contexts/resource/types";
import type { RedirectAction } from "../form/types";

export type UseRedirectionAfterSubmissionType = () => (options: {
  redirect: RedirectAction;
  redirectOnSuccess?: boolean;
  resource?: IResourceItem;
  id?: BaseKey;
  meta?: MetaQuery;
}) => void;

export const useRedirectionAfterSubmission: UseRedirectionAfterSubmissionType =
  () => {
    const { show, edit, list, create } = useNavigation();

    const handleSubmitWithRedirect = useCallback(
      ({
        redirect,
        redirectOnSuccess = true,
        resource,
        id,
        meta = {},
      }: {
        redirect: RedirectAction;
        redirectOnSuccess?: boolean;   
        resource?: IResourceItem;
        id?: BaseKey;
        meta?: MetaQuery;
      }) => {

        if (!redirectOnSuccess) return;
        if (redirect && resource) {
          if (!!resource.show && redirect === "show" && id) {
            return show(resource, id, undefined, meta);
          }

          if (!!resource.edit && redirect === "edit" && id) {
            return edit(resource, id, undefined, meta);
          }

          if (!!resource.create && redirect === "create") {
            return create(resource, undefined, meta);
          }

          return list(resource, "push", meta);
        }
        return;
      },
      [],
    );

    return handleSubmitWithRedirect;
  };
