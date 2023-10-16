import {
    ProjectKanbanList,
    ProjectStageModalCreate,
} from "pages/scrumboard/components";

export default function ScrumboardKanbanStageCreatePage() {
    return (
        <ProjectKanbanList>
            <ProjectStageModalCreate />
        </ProjectKanbanList>
    );
}
