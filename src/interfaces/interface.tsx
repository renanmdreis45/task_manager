export interface ICard {
    id: number;
    desc: string;
    prazo: string;
    status: string;
}

export interface IGroup {
    id: number;
    title: string;
    cards: ICard[];
}