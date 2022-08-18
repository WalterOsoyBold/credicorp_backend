import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {IsNotEmpty, Length} from "class-validator";
import {WinnerBackup} from "../Winners/WinnerBackup";
import {Winner} from "../Winners/Winner";
import { Event } from "../Events/Event";

@Entity('prize')
export class Prize {
    @PrimaryColumn()
    id: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 100)
    name: string;

    @ManyToOne(() => Event, event => event.prizes)
    @JoinColumn()
    event: Event

    @OneToMany(() => WinnerBackup, winnerBackup => winnerBackup.prize)
    @JoinColumn()
    backupWinners: WinnerBackup[];

    @OneToMany(() => Winner, winner => winner.raffle)
    @JoinColumn()
    winners: Winner[];

}
