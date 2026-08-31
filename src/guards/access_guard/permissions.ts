export enum Action {
    ALL = "All",
    CREATE = "Create",
    LIST = "List",
    UPDATE = "Update",
    DELETE = "Delete",
    VIEW = "View"
};

export enum ContentType {
    Section = "Section",
    User = "User",
    Service = "Service",
    Role = "Role",
    Product = "Product",
    Faq = "Faq",
    Metric = "Metric",
    Document = "Document",
    Award = "Award",
    Exchangerate = "Exchangerate",
    Currency = "Currency",
    Article = "Article",
    Permission = "Permission",
    Position = "Position",
    Leader = "Leader",
    Offers = "Offers"
}

export function getPermission(contentType: ContentType, actions: Action[]) {
    return actions.map((el) => (`${el}_${contentType}`.toLowerCase()))
}

export function comparePermissions(base: string[], child: string[]) {
    return base.some((el) => child.includes(el))
}