import { ConflictException, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto, LoginAdminDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { Repository } from 'typeorm';
import { BcryptUtilService } from '../utils/bcrypt.util';

@Injectable()
export class CheckAdminExistPipe implements PipeTransform {
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
  ) {}
  async transform(value: CreateAdminDto): Promise<CreateAdminDto> {
    const adminExistCheck = await this.adminRepo.findOne({
      where: { name: value.name },
    });
    if (adminExistCheck) {
      throw new ConflictException(
       [`Wrong Credentials`],
      );
    } else {
      return value;
    }
  }
}

@Injectable()
export class IsAdminExistPipe implements PipeTransform{
    constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
  ) {}
  async transform(value:LoginAdminDto):Promise<LoginAdminDto>{
    const isAdminExist=await this.adminRepo.findOne({where:{name:value.name}});
    if(!isAdminExist){
      throw new ConflictException(
        [`Wrong Credentials`],
       );
    }
    // else if(isAdminExist && !isAdminExist.isActive){
    //   throw new UnauthorizedException(
    //     [`User is not active`],
    //    );
    // }
    else{
      (value as any).isAdminExist=isAdminExist;
      return value;
    }
  }
}


@Injectable()
export class ChckPasswordIsValid implements PipeTransform{
  constructor(private readonly bcryptService:BcryptUtilService){}
  async transform(value:LoginAdminDto,):Promise<LoginAdminDto & { id: number }>{
    const {password}=value;
    const adminFromPreviousPipe = (value as any).isAdminExist;

    if (!adminFromPreviousPipe || typeof adminFromPreviousPipe.id === 'undefined' || !adminFromPreviousPipe.password) {
      throw new ConflictException(
        [`User details are incomplete from a previous step.`]
      );
    }

    const {password:hashedPassword, id: adminId} = adminFromPreviousPipe;
    const isPasswordValid=await this.bcryptService.bcryptCompareUtil(password,hashedPassword)

    if(!isPasswordValid){
      throw new ConflictException(
        [`Bad Credentials`],
       );
    };

    return { ...value, id: adminId };
  }
}