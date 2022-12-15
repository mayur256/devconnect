export interface ValidationErrorResult {
    param: string;
    msg: string;
    value?: string;
    location?: string
};

export interface IMailBody {
    subject: string;
    body: string;
};
