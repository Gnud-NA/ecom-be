import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import User from "@src/app/users/entities/user.entity";
import { UserRepository } from "@src/app/users/users.repository";
import AddressBook from "@src/ecom/address-book/entities/address-book.entity";
import { AddressBookController } from "./address-book.controller";
import { AddressBookRepository } from "./address-book.repository";
import { AddressBookService } from "./address-book.service";

@Module({
    imports: [SequelizeModule.forFeature([User, AddressBook])],
    controllers: [AddressBookController],
    providers: [AddressBookService, AddressBookRepository, UserRepository],
    exports: [AddressBookService],
})
export class AddressBookModule {}
