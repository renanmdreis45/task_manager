export interface ICard {
    id: string;
    desc: string;
    prazo: string;
    state: string;
}



export interface IGroup {
    id: string;
    title: string;
    cards: ICard[];
}

