import {IsNotEmpty, Length} from "class-validator";
import {Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, OneToMany} from "typeorm";
import {Event} from "../Events/Event";
import "../../config/UUID.interface";
import {WinnerBackup} from "../Winners/WinnerBackup";
import {Winner} from "../Winners/Winner";

@Entity('raffle')
export class Raffle {
    @PrimaryColumn()
    id: string;

    @Column()
    @IsNotEmpty()
    @Length(2, 100)
    name: string;

    @ManyToOne(() => Event, event => event.raffles)
    @JoinColumn()
    event: Event;

    @OneToMany(() => WinnerBackup, winnerBackup => winnerBackup.raffle)
    @JoinColumn()
    backupWinners: WinnerBackup[];

    @OneToMany(() => Winner, winner => winner.raffle)
    @JoinColumn()
    winners: Winner[];
}
