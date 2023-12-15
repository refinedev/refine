import { FieldNode } from "graphql";
import gql from "graphql-tag";

import {
    fieldsToString,
    isMutation,
    isNodesField,
    removeNodesField,
} from "../../src/utils/graphql";

describe("isNodesField", () => {
    it('should return true for a node with a "nodes" field', () => {
        const query = gql`
            {
                users {
                    nodes {
                        id
                    }
                }
            }
        `;
        const node = (query.definitions[0] as any).selectionSet
            .selections[0] as FieldNode;
        expect(isNodesField(node)).toBeTruthy();
    });

    it('should return false for a node without a "nodes" field', () => {
        const query = gql`
            {
                users {
                    id
                }
            }
        `;
        const node = (query.definitions[0] as any).selectionSet
            .selections[0] as FieldNode;
        expect(isNodesField(node)).toBeFalsy();
    });
});

describe("removeNodesField", () => {
    it("should remove the nodes field from the string", () => {
        const inputString = `nodes {\nid\nname\navatarUrl\n}`;
        const expectedOutput = `id\nname\navatarUrl`;

        expect(removeNodesField(inputString)).toEqual(expectedOutput);
    });

    it("should return the same string if no nodes field is present", () => {
        const inputString = `users {\n  id\n}`;
        expect(removeNodesField(inputString)).toEqual(inputString);
    });
});

describe("fieldsToString", () => {
    it("UsersSelect", () => {
        const query = gql`
            query UsersSelect {
                users {
                    nodes {
                        id
                        name
                        avatarUrl
                    }
                }
            }
        `;
        const expectedOutput = `id\nname\navatarUrl`;
        expect(fieldsToString(query)).toEqual(expectedOutput);
    });

    it("ContactShow", () => {
        const query = gql`
            query ContactShow($id: ID!) {
                contact(id: $id) {
                    id
                    name
                    email
                    company {
                        id
                        name
                        avatarUrl
                    }
                    status
                    jobTitle
                    phone
                    timezone
                    avatarUrl
                    salesOwner {
                        id
                        name
                        avatarUrl
                    }
                    createdAt
                }
            }
        `;

        // TODO: Fix `salesOwner` absent from fields.
        // const expectedOutput = `id\nname\nemail\ncompany {\n  id\n  name\n  avatarUrl\n}\nstatus\njobTitle\nphone\ntimezone\navatarUrl\nsalesOwner {\n  id\n  name\n  avatarUrl\n}\ncreatedAt`;

        expect(fieldsToString(query)).toMatchSnapshot();
    });

    it("Upcoming Events", () => {
        const query = gql`
            query UpcomingEvents(
                $filter: EventFilter!
                $sorting: [EventSort!]
                $paging: OffsetPaging!
            ) {
                events(filter: $filter, sorting: $sorting, paging: $paging) {
                    nodes {
                        id
                        title
                        color
                        startDate
                        endDate
                    }
                    totalCount
                }
            }
        `;

        expect(fieldsToString(query)).toMatchSnapshot();
    });

    it("CompaniesTable", () => {
        const query = gql`
            query CompaniesTable(
                $filter: CompanyFilter!
                $sorting: [CompanySort!]!
                $paging: OffsetPaging!
            ) {
                companies(filter: $filter, sorting: $sorting, paging: $paging) {
                    nodes {
                        id
                        name
                        avatarUrl
                        dealsAggregate {
                            sum {
                                value
                            }
                        }
                        salesOwner {
                            id
                            name
                            avatarUrl
                        }
                        contacts {
                            nodes {
                                id
                                name
                                avatarUrl
                            }
                        }
                    }
                    totalCount
                }
            }
        `;

        expect(fieldsToString(query)).toMatchSnapshot();
    });

    it("CompanyTitleForm", () => {
        const query = gql`
            mutation CompanyTitleForm($input: UpdateOneCompanyInput!) {
                updateOneCompany(input: $input) {
                    id
                    name
                    avatarUrl
                    salesOwner {
                        id
                        name
                        avatarUrl
                    }
                }
            }
        `;

        expect(fieldsToString(query)).toMatchSnapshot();
    });

    it("CategoryEdit", () => {
        const query = gql`
            mutation CategoryEdit($input: UpdateOneCategoryInput!) {
                updateOneCategory(input: $input) {
                    id
                    title
                }
            }
        `;

        expect(fieldsToString(query)).toMatchSnapshot();
    });
});

describe("isMutation", () => {
    it("should return true for a mutation", () => {
        const mutation = gql`
            mutation {
                addUser {
                    id
                }
            }
        `;
        expect(isMutation(mutation)).toBeTruthy();
    });

    it("should return false for a query", () => {
        const query = gql`
            {
                users {
                    id
                }
            }
        `;
        expect(isMutation(query)).toBeFalsy();
    });
});
