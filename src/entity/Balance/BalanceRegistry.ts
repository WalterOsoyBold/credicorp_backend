import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {IsNotEmpty, Length} from "class-validator";
import {IsNumber} from "class-validator";
import {Event} from "../Events/Event";
import {Attempt} from "../Raffles/Attempt";
import "../../config/UUID.interface";
import {v4 as uuidv4} from 'uuid';
import {WinnerBackup} from "../Winners/WinnerBackup";
import {Winner} from "../Winners/Winner";

@Entity('balance_registry')
export class BalanceRegistry implements UUIDInterface {

    constructor() {
        this.generateUUID();
    }

    @PrimaryColumn()
    id: string;

    @Column()
    @IsNotEmpty()
    @Length(1, 100)
    name: string;

    @Column({nullable: false, name: 'lastname'})
    @IsNotEmpty()
    @Length(1, 100)
    lastName: string;

    @Column({nullable: false, name: 'initial_balance', type: 'float'})
    @IsNotEmpty()
    @IsNumber()
    initialBalance: number;

    @Column({nullable: false, name: 'final_balance', type: 'float'})
    @IsNotEmpty()
    @IsNumber()
    finalBalance: number;

    @Column({name: 'balance', type: 'float'})
    @IsNumber()
    balance: number;

    @Column({name: 'attempts_allowed', nullable: true, type: 'int'})
    @IsNumber()
    attemptsAllowed: number;


    @Column({name: 'account_id', nullable: false, type: 'varchar', length: 15})
    @IsNumber()
    accountId: string;

    @ManyToOne(() => Event, event => event.balanceRegistries)
    @JoinColumn()
    event: Event;

    @OneToMany(() => Attempt, attempt => attempt.balanceRegistry)
    @JoinColumn()
    attempts: Attempt[];

    @OneToMany(() => WinnerBackup, winnerBackup => winnerBackup.raffle, {cascade: true})
    @JoinColumn()
    winners: Winner[];

    generateUUID() {
        this.id = uuidv4()
    }
}
