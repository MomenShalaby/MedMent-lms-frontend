import { Category } from "./category.model";

export interface Course {
    id: number;
    name: string;
    track: string;
    duration_hours: number;
    sessions_number: number;
    short_desc: string | null;
    long_desc: string | null;
    exp_level: 'beginner' | 'intermediate' | 'advanced';
    image: string;
    category: Category;
}

//     prerequests_courses: string;  ==> new table