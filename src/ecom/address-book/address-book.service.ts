import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "@src/app/users/users.repository";
import { BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base";
import { AddressBookFilter } from "@src/ecom/address-book/dto/address-book.dto";
import { UpdateAddressBookDto } from "@src/ecom/address-book/dto/update-address-book.dto";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import { plainToInstance } from "class-transformer";
import { AddressBookRepository } from "./address-book.repository";
import { CreateAddressBookDto } from "./dto/create-address-book.dto";
import AddressBook from "./entities/address-book.entity";

@Injectable()
export class AddressBookService {
    constructor(private addressBookRepo: AddressBookRepository, private userRepo: UserRepository) {}

    async create(createAddressBookDto: CreateAddressBookDto, userId: number): Promise<AddressBook> {
        try {
            const user = await this.userRepo.findById(userId);
            if (!user) {
                throw new BadRequestException("User not found");
            }
            const addressBookDefault = await this.addressBookRepo.findOne({ where: { userId, isDefault: true } });

            const isDefault = addressBookDefault ? false : true;
            const newAddressBook = await this.addressBookRepo.create({ ...createAddressBookDto, userId, isDefault });
            return plainToInstance(AddressBook, newAddressBook);
        } catch (error) {
            throw error;
        }
    }

    async setDefault(id: number, userId: number) {
        const addressBook = await this.addressBookRepo.findById(id);
        if (!addressBook || Number(addressBook?.dataValues?.userId) !== Number(userId)) {
            throw new BadRequestException("Address book not found");
        }
        await this.addressBookRepo.updateWhere({ isDefault: false }, { where: { userId, isDefault: true } });
        const updatedAddressBook = await this.addressBookRepo.updateById(id, { isDefault: true });

        return updatedAddressBook;
    }

    async autoSetDefault(userId: number) {
        try {
            const addressBooks = await this.addressBookRepo.find({ where: { userId }, order: [["createdAt", "DESC"]] });

            if (!addressBooks.length) {
                return;
            }

            if (addressBooks.length === 1) {
                if (addressBooks[0].isDefault) {
                    return;
                }
                await this.addressBookRepo.update({ isDefault: true }, { where: { id: addressBooks[0].id } });
                return;
            }

            const addressBookDefault = await this.addressBookRepo.findOne({ where: { userId, isDefault: true } });
            if (addressBookDefault) {
                return;
            }

            await this.addressBookRepo.update({ isDefault: true }, { where: { id: addressBooks[0].id } });
            return;
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter?: AddressBookFilter, userId?: number): Promise<BaseResponse<AddressBook[]>> {
        const { count, data } = await this.addressBookRepo.findAndCount({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
                userId,
            },
        });

        return { count, data: plainToInstance(AddressBook, data) };
    }

    async findOne(id: number, requesterId: number): Promise<AddressBook> {
        const addressBook = await this.addressBookRepo.findOne({ where: { id, userId: requesterId } });
        if (!addressBook) {
            throw new BadRequestException("Address book not found");
        }
        return addressBook;
    }

    async update(id: number, updateAddressBookDto: UpdateAddressBookDto): Promise<BaseUpdatedResponse<AddressBook>> {
        const addressBook = await this.addressBookRepo.findById(id);
        if (!addressBook) {
            throw new BadRequestException("Address book not found");
        }
        await addressBook.update({ ...addressBook, ...updateAddressBookDto });
        return {
            status: true,
            data: addressBook,
        };
    }

    async delete(id: number, requesterId: number): Promise<BaseDeletedResponse> {
        try {
            const addressBook = await this.addressBookRepo.findById(id);
            if (!addressBook || Number(addressBook?.dataValues?.userId) !== Number(requesterId)) {
                throw new BadRequestException("Address book not found");
            }
            await addressBook.destroy();
            await this.autoSetDefault(requesterId);
            return { status: true };
        } catch (error) {
            throw error;
        }
    }
}
