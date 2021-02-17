import React, {
    ReactElement,
    ReactNode,
    Children,
    FC,
    isValidElement,
    cloneElement,
    useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import {
    Form as AntdForm,
    Dropdown,
    Menu,
    Button,
    Row,
    Col,
    FormItemProps,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";

export interface FilterProps {
    resourceName: string;
}

export const Filter: FC<FilterProps> = ({ resourceName, children }) => {
    const history = useHistory();
    const { search } = useLocation();
    const [form] = AntdForm.useForm();

    const preQueries = qs.parse(search);

    const childFilters: FormItemProps[] = [];
    Children.map(children, (filterForm) => {
        if (isValidElement(filterForm)) {
            filterForm.props.children.map((filterItem: ReactElement): void => {
                const { name, label, hidden } = filterItem.props;
                childFilters.push({ name, label, hidden });
            });
        }
    });
    const [filters, setFilters] = useState(childFilters);

    const renderFilterForm = (form: ReactElement) => {
        const children = Children.map(
            form.props.children,
            (formItem): ReactNode => {
                const filterItemName = formItem.props.name;

                const currentFormItem = filters.find(
                    (item) => item.name === filterItemName,
                );

                let hidden = currentFormItem?.hidden;

                if (preQueries[filterItemName]) {
                    hidden = false;
                }

                const props = {
                    hidden,
                };

                return cloneElement<FormItemProps>(formItem, props);
            },
        );

        return cloneElement(form, {
            children: children,
        });
    };

    form.setFieldsValue(preQueries);

    const onValuesChange = (_changedValues: object, values: object): void => {
        const newQueries = {
            ...preQueries,
            ...values,
            current: 1,
        };

        return history.push(
            `/resources/${resourceName}?${qs.stringify(newQueries)}`,
        );
    };

    const filterFormElement = Children.map(children, (filterForm) => {
        if (isValidElement(filterForm)) {
            return cloneElement(renderFilterForm(filterForm), {
                onValuesChange,
                form,
            });
        }

        return filterForm;
    });

    const menu = (
        <Menu
            onClick={({ key }) => {
                const newFilters = [...filters];
                const selectedItemIndex = newFilters.findIndex(
                    (item) => item.name === key,
                );

                const newQueries = {
                    ...preQueries,
                };

                const selectedItem = newFilters[selectedItemIndex];

                if (selectedItem) {
                    selectedItem.hidden = !selectedItem.hidden;

                    // remove query
                    delete newQueries[`${selectedItem.name}`];
                }

                setFilters(newFilters);

                return history.push(
                    `/resources/${resourceName}?${qs.stringify(newQueries)}`,
                );
            }}
            data-testid="filters-dropdown"
        >
            {filters.map((item) => (
                <Menu.Item key={item.name as string}>{item.label}</Menu.Item>
            ))}
        </Menu>
    );

    if (!children) {
        return null;
    }

    return (
        <Row align="middle" justify="space-between">
            <Col>{filterFormElement}</Col>
            <Col>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button
                        data-testid="filters-dropdown-button"
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                    >
                        <FilterOutlined /> Filters
                    </Button>
                </Dropdown>
            </Col>
        </Row>
    );
};
