export interface EventProps {
    id: number;
    title: string;
    description?: string;
    location: string;
    date: string;
    deadline?:string;
    createdAt?: string;
    modifiedAt?: string | null;
}