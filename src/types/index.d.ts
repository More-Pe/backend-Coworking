export interface TokenDecoded {
    person_id: number;
    role: string;
    email: string;
}

declare global {
    namespace Express {
        export interface Request {
            tokenData: TokenDecoded;
        }
    }
}

