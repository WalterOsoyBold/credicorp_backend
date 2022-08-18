import {
    Entity,
    PrimaryGeneratedColumn,
    Column, ManyToOne, JoinColumn, OneToMany, PrimaryColumn
} from "typeorm";
import {v4 as uuidv4} from 'uuid';

import {Length, IsNotEmpty, IsEmail} from "class-validator";
import "../../config/UUID.interface";
import {Raffle} from "../Raffles/Raffle";
import {Prize} from "../Raffles/Prize";
import {BalanceRegistry} from "../Balance/BalanceRegistry";
import {Attempt} from "../Raffles/Attempt";


@Entity('winner')
export  class Winner implements UUIDInterface{
    constructor() {
        this.generateUUID();
    }
    @PrimaryColumn()
    id: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    @Length(5, 100)
    email: string

    @Column()
    @IsNotEmpty()
    @Length(8, 13)
    phone: string;

    @ManyToOne(() => BalanceRegistry, balanceRegistry => balanceRegistry.winners)
    @JoinColumn()
    balanceRegistry: BalanceRegistry;

    @ManyToOne(() => Attempt, attempt => attempt.winners)
    @JoinColumn()
    attempt: Attempt;

    @ManyToOne(() => Raffle, raffle => raffle.winners)
    raffle: Raffle;

    @ManyToOne(() => Prize, prize => prize.winners)
    @JoinColumn()
    prize: Prize;

    generateUUID() {
        this.id = uuidv4();
    }
}

