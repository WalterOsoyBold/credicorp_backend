import {Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {Attempt} from "./Attempt";
import "../../config/UUID.interface";

@Entity('attempt_status')
export class AttemptStatus {

    public static PENDING: string = '1';
    public static WINNER: string = '2';
    public static LOOSER: string = '3';


    @PrimaryColumn()
    id: string = AttemptStatus.PENDING;

    @Column({nullable: false})
    @IsNotEmpty()
    name: string;

    @Column({nullable: true})
    @IsNotEmpty()
    description: string;

    @OneToMany(() => Attempt, attempts => attempts.status)
    @JoinColumn()
    attempt: Attempt;
}
