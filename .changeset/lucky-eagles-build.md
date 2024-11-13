---
"@refinedev/antd": major
---

feat: added setAction feature #6451

This Changeset includes a major change and we STRONGLY recommend adding more information to the changeset:
Adding new feature under useModalForm, to change action programmatically

WHAT the breaking change is
It's taking static action.

WHY the change was made
To give user option to dynamically udate action.

HOW a consumer should update their code
`const { setAction, show, modalProps } = useModalForm({
action: "create",
});

// Call setAction to change the action type
const handleEdit = () => {
setAction("edit");
show();
};

const handleCreate = () => {
setAction("create");
show();
};`
