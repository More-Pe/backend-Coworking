//TOKEN DECODED
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

//ACCESS HISTORY INTERFACE
export interface AccessHistoryResponse {
    history_id: number;
    room: {
        room_id: number;
        room_name: string;
        room_type: string;
    };
    access_time: Date;
    action: string;
    person: {
        first_name: string;
        startup: string;
        email: string;
    };
}