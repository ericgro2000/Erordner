import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService)

	const frontendUrl = configService.get<string>("FRONTEND_URL") // Get FRONTEND_URL from .env

	app.setGlobalPrefix("api")
	app.use(cookieParser())
	app.enableCors({
		origin: [frontendUrl],
		credentials: true,
		exposedHeaders: "set-cookie"
	})
	await app.listen(7000)
}
bootstrap()
