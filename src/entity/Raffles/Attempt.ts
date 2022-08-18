import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {BalanceRegistry} from "../Balance/BalanceRegistry";
import {IsNotEmpty, Length} from "class-validator";
import {AttemptStatus} from "./AttemptStatus";
import "../../config/UUID.interface";
import {WinnerBackup} from "../Winners/WinnerBackup";
import {v4 as uuidv4} from 'uuid';
import {Winner} from "../Winners/Winner";

@Entity('attempt')
export class Attempt implements UUIDInterface {

    constructor() {
        this.generateUUID();
    }

    @PrimaryColumn()
    id: string;

    @Column({name: 'unique_id', type: 'varchar'})
    @IsNotEmpty()
    @Length(10, 50)
    uniqueId: string;

    @Column({nullable: false, type: 'long'})
    @IsNotEmpty()
    date: number;

    @ManyToOne(() => BalanceRegistry, balanceRegistry => balanceRegistry.attempts)
    @JoinColumn()
    balanceRegistry: BalanceRegistry;

    @ManyToOne(() => AttemptStatus, attemptStatus => attemptStatus.attempt)
    @JoinColumn()
    status: AttemptStatus;

    @OneToMany(() => WinnerBackup, winnerBackup => winnerBackup.raffle)
    @JoinColumn()
    winners: Winner[];

    generateUUID() {
        this.id = uuidv4();
    }
}
