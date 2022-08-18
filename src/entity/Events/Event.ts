import {Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, Length} from "class-validator";
import {BalanceRegistry} from "../Balance/BalanceRegistry";
import {Raffle} from "../Raffles/Raffle";
import "../../config/UUID.interface";
import {v4 as uuidv4} from 'uuid';
import { Prize } from "../Raffles/Prize";

@Entity('event')
export class Event implements UUIDInterface {
    constructor() {
        this.generateUUID();
    }

    @PrimaryColumn()
    id: string;

    @Column({nullable: false})
    @IsNotEmpty()
    @Length(1, 30)
    name: string;

    @Column({nullable: false, type: 'float'})
    @IsNotEmpty()
    factor: number;

    @Column({nullable: false, type: 'long'})
    @IsNotEmpty()
    date: number;

    @Column({nullable: false, type: 'number'})
    @IsNotEmpty()
    winners: number;

    @OneToMany(() => BalanceRegistry, balanceRegistry => balanceRegistry.event)
    @JoinColumn()
    balanceRegistries: BalanceRegistry[];

    @OneToMany(() => Raffle, raffle => raffle.event)
    @JoinColumn()
    raffles: Raffle[];

    @OneToMany(() => Prize, prize => prize.event)
    @JoinColumn()
    prizes: Prize[]

    generateUUID() {
        this.id = uuidv4();
    }
}
