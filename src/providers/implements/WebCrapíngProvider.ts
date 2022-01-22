import type { IWebScrapingProvider } from "../IWebScrapingProvider";
import cheerio from "cheerio";
import type { Tickets } from "../../entities/Tickets";
import type { } from "cheerio";

export class WebScrapingProvider implements IWebScrapingProvider {
    public getJsonTickets(html: string, data: Tickets): Array<object> {
        const $ = cheerio.load(html);
        const request: Array<object> = [];

        $(".tbl-depart-flights").each((indexTables: number, tables: cheerio.Element) => {
            $(tables).find(".flight-item").each((index: number, element: cheerio.Element) => {
                const idLocation = 2;
                const durationLocate = 1;
                const idSplitLocation = 0;
                const id = $(element).find(".flight").text().split(" ")[idLocation];
                const duration = $(element).find(".flight-duration-info").text().split(" ")[durationLocate];
                const cost: Array<string> = [];
                const boarding = $(element).find(".dep-time").text();
                let landing: string;

                try {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    landing = $(element).find(".arr-time").text().split(". ")[1].split("\n")[0];
                } catch {
                    landing = data.exitDate + " " + $(element).find(".arr-time").text();
                }

                $(element).find(".fare-price").each((indexPrice: number, elementPrice: cheerio.Element) => {
                    cost.push($(elementPrice).text());
                });

                request.push({
                    numeroVoo: id.split("\n")[idSplitLocation],
                    cost,
                    duracao: duration,
                    destino: data.origin,
                    origem: data.destiny,
                    embarque: data.exitDate + " " + boarding,
                    desembarque: landing,
                });
            });
        });
        const getNullError = 0;
        if (!request[getNullError]) throw new Error("Already exists this flight");
        return request;
    }
}

