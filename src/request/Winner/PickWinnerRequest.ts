import {IsNotEmpty} from "class-validator";
import {Event} from "../../entity/Events/Event";
import {Prize} from "../../entity/Raffles/Prize";

export class PickWinnerRequest {
    @IsNotEmpty()
    evt: Event;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    prize: Prize;
}

