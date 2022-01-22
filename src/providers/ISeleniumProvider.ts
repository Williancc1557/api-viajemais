import type { Tickets } from "../entities/Tickets";

export interface ISeleniumProvider {
    find: (dataForSearch: Tickets) => Promise<string>;
}