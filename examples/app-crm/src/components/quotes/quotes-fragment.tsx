export const quotesFragment = [
    "id",
    "title",
    "status",
    "description",
    "subTotal",
    "total",
    "tax",
    {
        items: ["title", "unitPrice", "quantity", "discount", "totalPrice"],
    },
    {
        company: ["id", "name", "country", "website", "avatarUrl"],
    },
    {
        salesOwner: ["id", "name"],
    },
    {
        contact: ["id", "name"],
    },
];
