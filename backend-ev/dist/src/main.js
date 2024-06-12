"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const bodyParser = require("body-parser");
const app_module_1 = require("./app.module");
require("dotenv/config");
const base_interceptor_1 = require("./Interceptor/base.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.APP_PORT;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.enableCors();
    app.useGlobalInterceptors(new base_interceptor_1.BaseInterceptor());
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map