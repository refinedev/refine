import { Col, Row, Spin } from "antd";
import { StoreMap } from "../map";
import { useStoreForm } from "./useStoreForm";
import { StoreFormFields } from "./fields";

export const StoreForm = () => {
    const {
        store,
        handleMapOnDragEnd,
        formProps,
        saveButtonProps,
        handleAddressChange,
        formLoading,
        latLng,
    } = useStoreForm();

    return (
        <Spin spinning={formLoading}>
            <Row gutter={16} wrap>
                <Col xs={24} sm={12} lg={9}>
                    <StoreFormFields
                        formProps={formProps}
                        saveButtonProps={saveButtonProps}
                        handleAddressChange={handleAddressChange}
                    />
                </Col>
                <Col
                    xs={24}
                    sm={12}
                    lg={15}
                    style={{
                        height: "calc(100vh - 300px)",
                        marginTop: "64px",
                    }}
                >
                    {store && (
                        <StoreMap
                            lat={latLng?.lat}
                            lng={latLng?.lng}
                            store={store}
                            onDragEnd={handleMapOnDragEnd}
                        />
                    )}
                </Col>
            </Row>
        </Spin>
    );
};
