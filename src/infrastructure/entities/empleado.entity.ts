import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum EmpleadoConstraints {
  PK_f9e0bab727c79997a14feaa2f85 = 'PK_f9e0bab727c79997a14feaa2f85',
}

@Entity('Empleados')
export class Empleado {
  @PrimaryColumn({ type: 'numeric', name: 'dni' })
  dni: number;

  @Column('numeric', { name: 'edad', nullable: false })
  edad: number;

  @Column('varchar', { name: 'nombre', length: 30, nullable: false })
  nombre: string;

  @Column('varchar', { name: 'cargo', length: 30, nullable: false })
  cargo: string;
}
