import type { Tickets } from "../entities/Tickets";

export interface IWebScrapingProvider {
    getJsonTickets: (html: string, data: Tickets) => Array<object>;
}