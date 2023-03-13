import { useEffect } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useSelect, useNavigation } from "@refinedev/core";
import {
    Select,
    Fieldset,
    Button,
    TextField,
    WindowContent,
    Window,
    WindowHeader,
    ListItem,
} from "react95";
import { TopMenu } from "components/bar";

export const PostEdit: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        resetField,
        control,
        formState: { errors },
    } = useForm();

    const { goBack } = useNavigation();

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.categoryId,
    });

    useEffect(() => {
        resetField("categoryId");
    }, [options]);

    return (
        <>
            <div style={{ marginBottom: 48 }}>
                <TopMenu>
                    <ListItem
                        onClick={() => {
                            goBack();
                        }}
                    >
                        Back to Posts
                    </ListItem>
                </TopMenu>
            </div>
            <Window style={{ width: "100%", height: "100%" }}>
                <form onSubmit={handleSubmit(onFinish)}>
                    <WindowHeader active={true} className="window-header">
                        <span>Edit Post</span>
                    </WindowHeader>
                    <WindowContent>
                        <label>Title: </label>
                        <br />
                        <TextField
                            {...register("title", { required: true })}
                            placeholder="Type here..."
                        />
                        {errors.title && <span>This field is required</span>}
                        <br />
                        <br />

                        <Controller
                            {...register("categoryId", { required: true })}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Fieldset label={"Category"}>
                                    <Select
                                        options={options}
                                        menuMaxHeight={160}
                                        width={160}
                                        variant="flat"
                                        onChange={onChange}
                                        value={value}
                                    />
                                </Fieldset>
                            )}
                        />
                        {errors.category && <span>This field is required</span>}
                        <br />
                        <label>Content: </label>
                        <br />
                        <TextField
                            {...register("content", { required: true })}
                            multiline
                            rows={10}
                            cols={50}
                        />

                        {errors.content && <span>This field is required</span>}
                        <br />
                        <Button type="submit" value="Submit">
                            Submit
                        </Button>
                        {formLoading && <p>Loading</p>}
                    </WindowContent>
                </form>
            </Window>
        </>
    );
};
