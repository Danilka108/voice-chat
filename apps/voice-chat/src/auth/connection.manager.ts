import { Injectable } from '@angular/core'
import { DeviceDetectorService } from 'ngx-device-detector'

@Injectable()
export class ConnectionManager {
  constructor(private readonly deviceDetecorService: DeviceDetectorService) {}

  tel(tel: string) {}
}
