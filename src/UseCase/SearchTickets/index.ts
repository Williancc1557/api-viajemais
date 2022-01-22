import { SeleniumProvider } from "../../providers/implements/SeleniumProvider";
import { WebScrapingProvider } from "../../providers/implements/WebCrapíngProvider";
import { SearchTicketsController } from "./SearchTicketsController";
import { SearchTicketsUseCase } from "./SearchTicketsUseCase";

const seleniumProvider = new SeleniumProvider();
const webCrapingProvider = new WebScrapingProvider();

const searchTicketsUseCase = new SearchTicketsUseCase(
    seleniumProvider,
    webCrapingProvider
);

export const searchTicketsController = new SearchTicketsController(searchTicketsUseCase);