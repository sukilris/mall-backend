import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@/common/abstract.entity';

@Entity({ name: 'sys_profession' })
export class SysProfessionEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, unique: true, comment: '职称' })
  name: string;

  @Column({
    type: 'tinyint',
    width: 1,
    unsigned: true,
    default: 1,
    comment: '状态: 0=禁用 1=开启',
  })
  status: number;

  @Column({
    name: 'order_num',
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '排序值',
  })
  orderNum: number;
}
