import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { DataSource, EntityNotFoundError } from 'typeorm';
import Alkalmazott from './alkalmazott.entity';
import { AppService } from './app.service';
import NewAlkalamzottDto from './newAlkalmazott.dto';
import NewAlkalamzott from './newAlkalmazott.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('alkalmazott')
  async newAlkalamzott(@Body() alkalmazott: NewAlkalamzottDto) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    if (!alkalmazott.kezdoDatum) {
      alkalmazott.kezdoDatum = new Date();
      console.log(alkalmazott);
    }
    alkalmazottRepo.save(alkalmazott);
    return alkalmazott;
  }

  @Get('/alkalmazott/search')
  async searchAlkalmazott(@Query('email') email: string) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    /*
    const [adat, darab] = alkalmazottRepo
      .createQueryBuilder()
      .where('hivatalosEmail LIKE :email', { email: '%' + email + '%' })
      .getManyAndCount();
    return {alkalazottak: adat,
            count: darab,
          }
  */
    return await alkalmazottRepo
      .createQueryBuilder()
      .where('hivatalosEmail LIKE :email', { email: '%' + email + '%' })
      .addOrderBy('kezdoDatum', 'DESC')
      .getMany();
    //return await alkalmazottRepo.findOneByOrFail({ hivatalosEmail })
  }

  @Get('/alkalmazott/bersav')
  async bersavAlkalmazott(
    @Query('min') min: number,
    @Query('max') max: number,
  ) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    return await alkalmazottRepo
      .createQueryBuilder()
      .where('haviber <= :maxParam', { maxParam: max })
      .andWhere('haviber >= :minParam', { minParam: min })
      .addOrderBy('haviBer', 'DESC')
      .getMany();
  }

  @Get('/alkalmazott/:id')
  async getAlkalmazott(@Param('id') id: number) {
    try {
      const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
      return await alkalmazottRepo.findOneByOrFail({ id: id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('Az alkalmazott nem létezik');
      } else {
        throw e;
      }
    }
  }
}
