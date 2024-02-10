export interface IRepositoryTypeQL {
   data: IRepositoryTypeQlData
}
interface IRepositoryTypeQlData {
    user: IRepositoryTypeQlDataUser
}

interface IRepositoryTypeQlDataUser{
    pinnedItems: IRepositoryTypeQlDataUserPinnedItems
}

interface IRepositoryTypeQlDataUserPinnedItems {
    totalCount: number;
    edges: IRepositoryTypeQlDataUserPinnedItemsEdge[]
}

interface IRepositoryTypeQlDataUserPinnedItemsEdge {
    node: IRepositoryTypeQlDataUserPinnedItemsEdgeNode
}

interface IRepositoryTypeQlDataUserPinnedItemsEdgeNode {
    name: string;
    node: string;
    nameWithOwner: string;
    description: String;
}