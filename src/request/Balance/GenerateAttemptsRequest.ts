import {IsNotEmpty} from "class-validator";
import {Event} from "../../entity/Events/Event";

export class GenerateAttemptsRequest {
    @IsNotEmpty()
    evt: Event;
}

