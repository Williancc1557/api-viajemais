export interface ISearchTicketsDTO {
    origin: string;
    destiny: string;
    exitDate: string;
    returnDate?: string;
    adult: number;
    kid?: number;
    baby?: number;
}