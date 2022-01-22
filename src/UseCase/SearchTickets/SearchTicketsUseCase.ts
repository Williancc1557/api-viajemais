import { Tickets } from "../../entities/Tickets";
import type { ISeleniumProvider } from "../../providers/ISeleniumProvider";
import type { IWebScrapingProvider } from "../../providers/IWebScrapingProvider";
import type { ISearchTicketsDTO } from "./SearchTicketsDTO";

export class SearchTicketsUseCase {
    public constructor(
        private readonly selenium: ISeleniumProvider,
        private readonly webScraping: IWebScrapingProvider
    ) { }

    public async execute(data: ISearchTicketsDTO) {
        const tickets = new Tickets(data);
        const html = await this.selenium.find(tickets);
        const responseJson = this.webScraping.getJsonTickets(html, tickets);
        return responseJson;
    }
}