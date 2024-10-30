import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class YoutubeDomain {
  constructor(
    private readonly httpService: HttpService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
}
