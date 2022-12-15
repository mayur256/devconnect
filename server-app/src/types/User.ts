// type definition for User model fields
export interface IUser {
    name: string;
    email: string;
    is_verified: boolean;
    token: string | null;
    password: string;
    online: boolean;
    avatar: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
