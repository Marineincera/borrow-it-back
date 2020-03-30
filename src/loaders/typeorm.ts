
import { createConnection } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Item } from '../entities/item.entity';
import { ItemStatus } from '../entities/item-status.entity';
import { Loan } from '../entities/loan.entity';
import { LoanStatus } from '../entities/loan-status.entity';
import { Opinion } from '../entities/opinion.entity';
import { Tag } from '../entities/tag.entity';
import { User } from '../entities/user.entity';

export default async () => {

await createConnection({
    type: 'mysql',
    port: 3306,
    username: process.env.BORROW_DB_USER,
    password: process.env.BORROW_DB_PASS, 
    database: 'borrowit',
    entities: [
        Category,
        Item,
        ItemStatus,
        Loan,
        LoanStatus,
        Opinion,
        Tag,
        User

    ],
    synchronize: true,
});
};