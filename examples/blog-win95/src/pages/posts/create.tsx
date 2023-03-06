import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useSelect, useNavigation } from "@refinedev/core";
import {
    Select,
    Fieldset,
    Button,
    TextField,
    Window,
    WindowHeader,
    WindowContent,
    ListItem,
} from "react95";
import { TopMenu } from "components/bar";

export const PostCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { goBack } = useNavigation();

    const { options } = useSelect({
        resource: "categories",
    });

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
                <WindowHeader active={true} className="window-header">
                    <span>Create Post</span>
                </WindowHeader>
                <form onSubmit={handleSubmit(onFinish)}>
                    <WindowContent>
                        <label>Title: </label>
                        <br />
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
