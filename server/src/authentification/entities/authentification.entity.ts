import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export type Providers = "Google" | "Email" | "Passkey";

@Entity()
export class Authentification {
    @PrimaryGeneratedColumn("uuid")
    _uuid: string

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string

    @Column({ type: "varchar", length: 150, unique: true, nullable: false })
    email: string

    @Column({ type: "bool", nullable: false })
    emailVerified: boolean

    @Column({ type: "varchar", length: 300, nullable: true })
    pictureUrl: string

    @Column({ type: "enum", enum: ["Google", "Email", "Passkey"] })
    provider: Providers

    @DeleteDateColumn()
    deletedAt: Date
}
