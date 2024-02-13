import { useForm } from "@refinedev/antd";
import { useDebounceValue } from "usehooks-ts";
import {
    convertLatLng,
    getAddressWithLatLng,
    getLatLngWithAddress,
} from "../../../utils";
import { IStore } from "../../../interfaces";
import { useEffect, useState } from "react";

export const useStoreForm = () => {
    const form = useForm<IStore>();
    const store = form.queryResult?.data?.data;

    const [latLng, setLatLng] = useState<{
        lat?: number;
        lng?: number;
    }>();

    useEffect(() => {
        if (store?.address?.coordinate) {
            setLatLng({
                lat: store.address.coordinate?.[0],
                lng: store.address.coordinate?.[1],
            });
        }
    }, [store]);

    // we are using these debounced values to get lang and lat from the address text
    // to minimize the number of requests, we are using debounced values
    const [debouncedAdressValue, setDebouncedAdressValue] = useDebounceValue(
        form.formProps.form?.getFieldValue(["address", "text"]),
        500,
    );
    // get lat and lng with address
    useEffect(() => {
        if (debouncedAdressValue) {
            getLatLngWithAddress(debouncedAdressValue).then((data) => {
                // set form field with lat and lng values
                if (data) {
                    const { lat, lng } = convertLatLng({
                        lat: data.lat,
                        lng: data.lng,
                    });

                    form.formProps.form?.setFieldValue(
                        ["address", "coordinate"],
                        [lat, lng],
                    );

                    setLatLng({
                        lat,
                        lng,
                    });
                }
            });
        }
    }, [debouncedAdressValue]);

    const handleMapOnDragEnd = async ({
        lat,
        lng,
    }: {
        lat: number;
        lng: number;
    }) => {
        // get address with lat lng and set form field
        const data = await getAddressWithLatLng({ lat, lng });
        if (data) {
            // set form field with address value
            form.formProps.form?.setFieldValue(
                ["address", "text"],
                data.address,
            );
        }
    };

    const isLoading =
        form.queryResult?.isFetching || form.formLoading || !store;

    return {
        ...form,
        store,
        formLoading: isLoading,
        latLng,
        handleAddressChange: (address: string) =>
            setDebouncedAdressValue(address),
        handleMapOnDragEnd,
    };
};
