export interface ConfirmationRequest {
    id: number;
    firstName: string;
    lastName: string;
    role: 'STUDENT' | 'MANAGER';
}
