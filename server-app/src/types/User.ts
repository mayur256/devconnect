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

// General Profile types
type Skills = {
    id: string;
    alias: string;
}

export interface IProfileGeneral {
    handle: string;
    company: string;
    website: string;
    location: string;
    status: string;
    skills: Array<Skills>;
    bio: string;
    gitHubUserName: string;
    // experience: Array<typeof experienceSchema>;
    // education: Array<typeof educationSchema>;
    created_at: Date;
    updated_at: Date | null;
};
