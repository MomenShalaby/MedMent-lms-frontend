import { User } from "./user.model";

export interface Event {
    id: number;
    name: string;
    description: string;
    "short description": string;
    start_date: string;
    end_date: string;
    image: string;
}

export interface EventWithAttendees {
    id: number;
    name: string;
    description: string;
    "short description": string;
    start_date: string;
    end_date: string;
    image: string;
    attendees: Attendee[];
}

export interface Attendee {
	id: number;
	user_id: number;
	event_id: number;
	created_at: string;
	updated_at: string;
	user: User;
}