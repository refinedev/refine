import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import {
    Button,
    TextField,
    WindowContent,
    Window,
    WindowHeader,
    ListItem,
} from "react95";
import { TopMenu } from "components/bar";

export const CategoryEdit = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { goBack } = useNavigation();

    return (
        <>
            <div style={{ marginBottom: 48 }}>
                <TopMenu>
                    <ListItem
                        onClick={() => {
                            goBack();
                        }}
                    >
                        Back to Categories
                    </ListItem>
                </TopMenu>
            </div>
            <Window style={{ width: "100%", height: "100%" }}>
                <form onSubmit={handleSubmit(onFinish)}>
                    <WindowHeader active={true} className="window-header">
                        <span>Edit Category</span>
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
