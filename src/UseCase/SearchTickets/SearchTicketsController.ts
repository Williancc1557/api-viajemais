import type { SearchTicketsUseCase } from "./SearchTicketsUseCase";
import type { Response, Request } from "express";

export class SearchTicketsController {
    public constructor(
        private readonly searchTicketsUseCase: SearchTicketsUseCase,
    ) { }

    public async handle(req: Request, res: Response) {
        const { origem, destino, datalda, datavolta, adultos, criancas, bebes } = req.body;
        try {
            const response = await this.searchTicketsUseCase.execute({
                adult: adultos,
                destiny: destino,
                exitDate: datalda,
                origin: origem,
                baby: bebes,
                kid: criancas,
                returnDate: datavolta,
            });
            res.json(response);
        } catch (err) {
            res.json(err.message);
        }
    }
}