import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { isNil } from "src/common/utils/tool";

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    get nodeEvn() {
        return this.get('')
    }

    private get<T = string>(key: string) {
        const value = this.configService.get<T>(key)
        if (isNil(value)) {
            throw new Error(key + ' environment variable does not set')
        }
        return value
    }
}