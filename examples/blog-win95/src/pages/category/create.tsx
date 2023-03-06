import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import {
    Button,
    TextField,
    Window,
    WindowHeader,
    WindowContent,
    ListItem,
} from "react95";
import { TopMenu } from "components/bar";

export const CategoryCreate: React.FC = () => {
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
                <WindowHeader active={true} className="window-header">
                    <span>Create Post</span>
                </WindowHeader>
                <form onSubmit={handleSubmit(onFinish)}>
                    <WindowContent>
                        <label>Category Title: </label>
                        <br />
                        <br />
                        <TextField
                            {...register("title", { required: true })}
                            placeholder="Type here..."
                        />
                        {errors.title && <span>This field is required</span>}
                        <br />
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
