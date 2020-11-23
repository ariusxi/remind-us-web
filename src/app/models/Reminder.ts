import { Category } from './Category';

export interface Reminder {
    _id?:string;
    name:string;
    description:string;
    scheduled:Date;
    category?:Category;
}
