export class Tickets {
    public readonly origin: string;

    public readonly destiny: string;

    public readonly exitDate: string;

    public readonly returnDate?: string;

    public readonly adult: number;

    public readonly kid?: number;

    public readonly baby?: number;

    public constructor(props: Tickets) {
        Object.assign(this, props);

        if (!this.kid) this.kid = 0;

        if (!this.baby) this.baby = 0;

        if (!this.returnDate || this.returnDate == "") this.returnDate = this.exitDate;
    }
}