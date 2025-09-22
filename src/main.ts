import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bodyParser: false });
    // validation global
    app.useGlobalPipes(new ValidationPipe());

    /* Swagger */
    const config = new DocumentBuilder()
        .setTitle("FN1")
        .setDescription("The FN API description")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
    app.enableCors({
        origin: [
            "http://localhost",
            "http://localhost:3000",
            "http://localhost:3009",
            "http://localhost:3002",
            "http://vnsolution.tech",
            "http://cp.vnsolution.tech",
            "http://babysen.us",
            "http://babysen.babysen.us",
            "http://phoenixnren.babysen.us",
            "http://southernsaturday.babysen.us",
            "http://cp.babysen.us",
            "http://babysen.vnsolution.tech",
            "http://remembernguyen.com",
            "http://cp.remembernguyen.com",
            "http://babysen.com",
            "http://phoenixnren.com",
            "http://southensaturday.com",
            // ssl
            "https://localhost",
            "https://localhost:3000",
            "https://localhost:3009",
            "https://localhost:3002",
            "https://vnsolution.tech",
            "https://cp.vnsolution.tech",
            "https://babysen.us",
            "https://babysen.babysen.us",
            "https://phoenixnren.babysen.us",
            "https://southernsaturday.babysen.us",
            "https://cp.babysen.us",
            "https://babysen.vnsolution.tech",
            "https://remembernguyen.com",
            "https://cp.remembernguyen.com",
            "https://babysen.com",
            "https://phoenixnren.com",
            "https://southernsaturday.com",

            "http://remember.local",
            "http://babysen.local",
        ],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 4000, process.env.HOST ?? `0.0.0.0`);
    console.log(await app.getUrl());
    console.log((await app.getUrl()) + "/docs");
}
bootstrap();
