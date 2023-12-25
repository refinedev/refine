import gql from "graphql-tag";

export const ADMINISTRATION_USERS_QUERY = gql`
    query AdministrationUsers(
        $filter: UserFilter!
        $sorting: [UserSort!]
        $paging: OffsetPaging!
    ) {
        users(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                name

                jobTitle
                role
                avatarUrl
            }
            totalCount
        }
    }
`;

export const ADMINISTRATION_AUDIT_LOGS_QUERY = gql`
    query AdministrationAuditLogs(
        $filter: AuditFilter!
        $sorting: [AuditSort!]
        $paging: OffsetPaging!
    ) {
        audits(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                user {
                    id
                    name
                    avatarUrl
                }
                action
                targetEntity
                targetId
                changes {
                    field
                    from
                    to
                }
                createdAt
            }
            totalCount
        }
    }
`;
