import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import "../../config/UUID.interface";
import {BalanceRegistry} from "../Balance/BalanceRegistry";
import {Attempt} from "../Raffles/Attempt";
import {Raffle} from "../Raffles/Raffle";
import {Prize} from "../Raffles/Prize";
import {v4 as uuidv4} from 'uuid';
import {IsEmail, IsNotEmpty, Length} from "class-validator";

@Entity('winner_backup')
export class WinnerBackup {

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

    @ManyToOne(() => Raffle, raffle => raffle.backupWinners)
    raffle: Raffle;

    @ManyToOne(() => Prize, prize => prize.backupWinners)
    @JoinColumn()
    prize: Prize;

    generateUUID() {
        this.id = uuidv4();
    }
}
