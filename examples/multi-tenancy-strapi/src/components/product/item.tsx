import { DeleteButton } from "@refinedev/antd";
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";

import { IProduct } from "interfaces";
import { API_URL } from "../../constants";

type ProductItemProps = {
    item: IProduct;
    editShow: (id?: string | undefined) => void;
};

const { Meta } = Card;

export const ProductItem: React.FC<ProductItemProps> = ({ item, editShow }) => {
    const image = item.image ? API_URL + item.image.url : "/error.png";

    return (
        <Card
            style={{ width: 300 }}
            cover={<img alt="example" src={image} height="240" />}
            actions={[
                <EditOutlined key="edit" onClick={() => editShow(item.id)} />,
                <DeleteButton
                    key="delete"
                    size="small"
                    hideText
                    recordItemId={item.id}
                />,
            ]}
        >
            <Meta
                className="ant-card-meta-title"
                title={item.title}
                description={item.description}
            />
        </Card>
    );
};
