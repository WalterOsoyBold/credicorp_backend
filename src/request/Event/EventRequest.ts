import {IsNotEmpty, IsNumber} from "class-validator";

export class EventRequest {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2})
    factor: number;

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 0})
    date: number;

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 0})
    winners: number;
}
