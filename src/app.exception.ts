import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor() {
    super('Bad Request', HttpStatus.BAD_REQUEST);
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor() {
    super('Không tìm thấy dữ liệu', HttpStatus.NOT_FOUND);
  }
}
