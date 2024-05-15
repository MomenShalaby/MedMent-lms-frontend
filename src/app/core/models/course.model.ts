import { Category } from "./category.model";

export interface Course {
    id: number
    name: string
    description: string
    image: string
    category: Category
    instructor: string
    title: string
    video: string
    label: string
    duration: string
    resources: string
    certificate: string
    price: number
    prerequisites: string
    featured: string
    status: string
    created_at: string
    updated_at: string
    sections: Section[]
}

export interface Section {
    id: number
    course_id: number
    title: string
    lectures: Lecture[]
  }
  
  export interface Lecture {
    id: number
    course_section_id: number
    title: string
    content: string
    video: string
    created_at: string
    updated_at: string
  }

  export interface UpdateCourse {
    course_name: string,
    description: string,
    image: File,
    instructor: string,
    course_title: string,
    video: string,
    label: string,
    duration: string,
    resources: string,
    certificate: string,
    prerequisites: string,
    featured: string,
    status: string, //active || inactive: default
    price: number
  }