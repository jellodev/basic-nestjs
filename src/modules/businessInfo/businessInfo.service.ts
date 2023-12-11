import { BusinessInfo } from './model/businessInfo.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessInfoService {
  async findOne(id: number): Promise<BusinessInfo> {
    if (id === 1) {
      return { businessNo: 123456789, fax: '123456789', address: '123456789' };
    } else {
      return { businessNo: 987654321, fax: '987654321', address: '987654321' };
    }
  }
}
