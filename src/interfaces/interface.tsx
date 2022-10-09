export interface ICard {
    id: string;
    desc: string;
    prazo: string;
    state: string;
}

export interface ICardState {
    cards: ICard[];
}

export interface IGroup {
    id: string;
    title: string;
    cards: ICard[];
}

export interface IGroupState {
    groups: IGroup[]
}