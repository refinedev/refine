export const PostCreate = function Index() {
    return (
        <form>
            <label>Title: </label>
            <input />

            <br />
            <label>Status: </label>
            <select>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
            </select>
            <br />
            <label>Category: </label>
            <select defaultValue={""}>
                <option value={""} disabled>
                    Please select
                </option>
            </select>
            <br />
            <label>Content: </label>
            <br />
            <textarea rows={10} cols={50} />
            <br />
            <br />
            <label>Image: </label>
            <input id="fileInput" type="file" />
            <input type="hidden" />
            <br />
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
};
