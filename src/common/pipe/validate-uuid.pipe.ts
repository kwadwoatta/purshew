import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isUUID } from 'class-validator'

@Injectable()
export class ValidateUUIDPipe implements PipeTransform {
  transform(uuid: string) {
    if (!uuid) {
      throw new BadRequestException(`a uuid parameter was not provided`)
    }

    if (!isUUID(uuid)) {
      throw new BadRequestException('invalid UUID')
    }

    return uuid
  }
}
