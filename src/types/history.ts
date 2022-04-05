import ItemInterface from "@/types/item";

export default interface HistoryInterface {
    item: ItemInterface;
    action: string;
    created: object
}
