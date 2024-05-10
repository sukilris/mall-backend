import { NumberField, StringField } from '@/decorators/field.decorator';
import { ISysUserPagingQueryItem } from '@/interfaces/respository';
import { OmitType } from '@nestjs/swagger';

export class SysUserPageItemRespDto {
  id: number;
  account: string;
  email: string;
  gender: number;
  mobile: string;
  nickname: string;
  orderNum: number;
  remark: string;
  status: number;
  username: string;

  constructor(entity: ISysUserPagingQueryItem) {
    this.id = entity.id;
    this.account = entity.account;
    this.email = entity.email;
    this.gender = entity.gender;
    this.mobile = entity.mobile;
    this.nickname = entity.nickname;
    this.orderNum = entity.orderNum;
    this.remark = entity.remark;
    this.status = entity.status;
    this.username = entity.username;
  }
}

export class SysUserDeleteReqDto {
  @NumberField({
    int: true,
    min: 1,
  })
  id: number;
}

export class SysUserAddReqDto {
  @StringField({
    minLength: 4,
    maxLength: 50,
  })
  account: string;
  @StringField({
    required: false,
  })
  email?: string;
  @NumberField({
    min: 0,
    max: 2,
  })
  gender: number;
  @StringField({
    required: false,
  })
  mobile?: string;
  @StringField({
    required: false,
  })
  nickname?: string;
  @NumberField({
    min: 0,
    required: false,
  })
  orderNum?: number;
  @StringField({
    required: false,
  })
  remark?: string;
  @NumberField({
    each: true,
    int: true,
    min: 1,
  })
  roleIds: number[];
  @NumberField({
    min: 0,
    max: 1,
  })
  status: number;
  @StringField()
  username: string;
}

export class SysUserUpdateReqDto extends OmitType(SysUserAddReqDto, [
  'account',
]) {
  @NumberField({ int: true, min: 1 })
  id: number;
}
