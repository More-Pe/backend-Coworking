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
    person?: {
        first_name: string;
        startup: string;
        email: string;
    };
}

export interface DailyReportResponse {
    report_date: Date;
    total_accesses: {
        count: number;
        persons: Array<{
            user_id: number;
            first_name: string;
            last_name: string;
            startup: string;
            last_access: Date;
        }>;
    };
    total_absences: number;
    frequent_users: number;
    infrequent_users: number;
    peak_hour: string;
    accesses_by_room: { [key: string]: number };
}