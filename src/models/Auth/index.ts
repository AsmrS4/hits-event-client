export interface LoginProps {
    login: string;
    password: string|number;
}


export interface ProfileProps {
    login: string;
    firstName: string;
    lastName: string;
    createTime: string;
    role: string;
}