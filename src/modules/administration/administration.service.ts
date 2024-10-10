import { Between, MoreThan, LessThan } from 'typeorm';
import { Person } from '../person/person.entity';
import { Administration } from './administration.entity';
import { AccessHistory } from '../access_history/access_history.entity';
import { Access, Status } from '../access/access.entity';
import { Room } from '../room/room.entity';
import { DailyReportResponse } from '../../types';

export class AdministrationService {
    public static async generateDailyReport(reportDate?: Date): Promise<DailyReportResponse> {
        const date = reportDate || new Date();
        date.setHours(0, 0, 0, 0);
    
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
    
        const accessHistoryToday = await AccessHistory.find({
            where: {
                access_time: Between(date, nextDay),
                action: 'entry'
            },
            relations: ['person', 'room', 'person.startup'],
        });
    
        const filteredAccesses = accessHistoryToday.filter(access => {
            const accessTime = new Date(access.access_time);
            const hour = accessTime.getHours();
            const minute = accessTime.getMinutes();
            return (hour > 8 || (hour === 8 && minute >= 30)) && (hour < 18 || (hour === 18 && minute <= 15));
        });
    
        const totalAccesses = filteredAccesses.length;
    
        const usersTodayIds = [...new Set(filteredAccesses.map(access => access.person.person_id))];
    
        const frequentUsers = filteredAccesses.filter(access => access.person.frequency_status === 'frequent');
        const infrequentUsers = filteredAccesses.filter(access => access.person.frequency_status === 'infrequent');
    
        const allUsers = await Person.find();
        const absentUsers = allUsers.filter(user => !usersTodayIds.includes(user.person_id));
        const totalAbsences = absentUsers.length;
    
        const accessHours: { [hour: number]: number } = {};
        filteredAccesses.forEach(access => {
            const hour = new Date(access.access_time).getHours();
            accessHours[hour] = (accessHours[hour] || 0) + 1;
        });
        let peakHour = 'N/A';  
        if (Object.keys(accessHours).length > 0) {
            const peakHourNum = Object.keys(accessHours).reduce((a, b) => accessHours[+a] > accessHours[+b] ? a : b);
            peakHour = `${peakHourNum}:00-${+peakHourNum + 1}:00`;
        }
    
        const accessesByRoom = filteredAccesses.reduce((acc, access) => {
            const roomName = access.room.room_name;
            acc[roomName] = (acc[roomName] || 0) + 1;
            return acc;
        }, {} as {[key: string]: number});
    
        const report: DailyReportResponse = {
            report_date: date,
            total_accesses: {
                count: totalAccesses,
                persons: filteredAccesses.map(access => ({
                    user_id: access.person.person_id,
                    first_name: access.person.first_name,
                    last_name: access.person.last_name,
                    startup: access.person.startup.name,
                    last_access: access.access_time,
                })),
            },
            total_absences: totalAbsences,
            frequent_users: frequentUsers.length,
            infrequent_users: infrequentUsers.length,
            peak_hour: peakHour,
            accesses_by_room: accessesByRoom,
        };
    
        return report;
    }
    
    public static async getReportsInRange(
        start_date: string, 
        end_date: string, 
        page: number = 1, 
        limit: number = 10
    ): Promise<{ reports: DailyReportResponse[], total: number, page: number, totalPages: number }> {
        const start = new Date(start_date);
        const end = new Date(end_date);
        end.setHours(23, 59, 59, 999);

        const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
        const totalPages = Math.ceil(totalDays / limit);
        const skip = (page - 1) * limit;

        const reports: DailyReportResponse[] = [];

        for (let i = skip; i < Math.min(skip + limit, totalDays); i++) {
            const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);

            const accessHistories = await AccessHistory.find({
                where: {
                    access_time: Between(date, nextDay),
                    action: 'entry'
                },
                relations: ['person', 'room', 'person.startup'],
            });

            const filteredAccesses = accessHistories.filter(access => {
                const accessTime = new Date(access.access_time);
                return (accessTime.getHours() > 8 || (accessTime.getHours() === 8 && accessTime.getMinutes() >= 30)) &&
                       (accessTime.getHours() < 18 || (accessTime.getHours() === 18 && accessTime.getMinutes() <= 15));
            });

            const totalAccesses = filteredAccesses.length;
            const usersTodayIds = [...new Set(filteredAccesses.map(access => access.person.person_id))];
            const frequentUsers = filteredAccesses.filter(access => access.person.frequency_status === 'frequent');
            const infrequentUsers = filteredAccesses.filter(access => access.person.frequency_status === 'infrequent');

            const allUsers = await Person.find();
            const absentUsers = allUsers.filter(user => !usersTodayIds.includes(user.person_id));
            const totalAbsences = absentUsers.length;

            const accessHours: { [hour: number]: number } = {};
            filteredAccesses.forEach(access => {
                const hour = new Date(access.access_time).getHours();
                accessHours[hour] = (accessHours[hour] || 0) + 1;
            });

            let peakHour = 'N/A';
            if (Object.keys(accessHours).length > 0) {
                const peakHourNum = Object.keys(accessHours).reduce((a, b) => accessHours[+a] > accessHours[+b] ? a : b);
                peakHour = `${peakHourNum}:00-${+peakHourNum + 1}:00`;
            }

            const accessesByRoom = filteredAccesses.reduce((acc, access) => {
                const roomName = access.room.room_name;
                acc[roomName] = (acc[roomName] || 0) + 1;
                return acc;
            }, {} as {[key: string]: number});

            const report: DailyReportResponse = {
                report_date: new Date(date),
                total_accesses: {
                    count: totalAccesses,
                    persons: filteredAccesses.map(access => ({
                        user_id: access.person.person_id,
                        first_name: access.person.first_name,
                        last_name: access.person.last_name,
                        startup: access.person.startup.name,
                        last_access: access.access_time,
                    })),
                },
                total_absences: totalAbsences,
                frequent_users: frequentUsers.length,
                infrequent_users: infrequentUsers.length,
                peak_hour: peakHour,
                accesses_by_room: accessesByRoom,
            };

            reports.push(report);
        }

        return {
            reports,
            total: totalDays,
            page,
            totalPages
        };
    }

    private static formatDuration(durationInMs: number): string {
        const hours = Math.floor(durationInMs / 3600000);
        const minutes = Math.floor((durationInMs % 3600000) / 60000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    public static async getRoomUsageStats(): Promise<any> {
        const rooms = await Room.find({ relations: ['accesses'] });
    
        const roomStats = await Promise.all(rooms.map(async room => {
            const totalUses = room.accesses.length;
    
            let totalStayDuration = 0;
            let averageStay = 0;
            if (totalUses > 0) {
                totalStayDuration = room.accesses.reduce((acc, access) => {
                    if (access.exit_time) {
                        const stayDuration = new Date(access.exit_time).getTime() - new Date(access.entry_time).getTime();
                        return acc + stayDuration;
                    }
                    return acc;
                }, 0);
                averageStay = totalStayDuration / totalUses;
            }
    
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
    
            const accessesToday = room.accesses.filter(access => {
                const entryTime = new Date(access.entry_time);
                const hour = entryTime.getHours();
                const minute = entryTime.getMinutes();
    
                const isWithinWorkingHours = 
                    (hour > 8 || (hour === 8 && minute >= 30)) && 
                    (hour < 18 || (hour === 18 && minute <= 15));
    
                return entryTime >= today && entryTime < tomorrow && isWithinWorkingHours;
            });
    
            const allUsers = await Person.find();
            const usersTodayIds = [...new Set(accessesToday.filter(access => access.person).map(access => access.person.person_id))];
            const absentUsers = allUsers.filter(user => !usersTodayIds.includes(user.person_id));
            const absences = absentUsers.length;
    
            const accessHours: { [hour: number]: number } = {};
            accessesToday.forEach(access => {
                const hour = new Date(access.entry_time).getHours();
                const minute = new Date(access.entry_time).getMinutes();
                
                if ((hour > 8 || (hour === 8 && minute >= 30)) && (hour < 18 || (hour === 18 && minute <= 15))) {
                    accessHours[hour] = (accessHours[hour] || 0) + 1;
                }
            });
    
            let peakHour = 'N/A';
            if (Object.keys(accessHours).length > 0) {
                const peakHourNum = Object.keys(accessHours).reduce((a, b) => accessHours[+a] > accessHours[+b] ? a : b);
                peakHour = `${peakHourNum}:00-${+peakHourNum + 1}:00}`;
            }
                const accessTimestamps = room.accesses
                .map(access => new Date(access.entry_time).getTime())
                .filter(timestamp => {
                    const entryTime = new Date(timestamp);
                    const hour = entryTime.getHours();
                    const minute = entryTime.getMinutes();
    
                    return (hour > 8 || (hour === 8 && minute >= 30)) && (hour < 18 || (hour === 18 && minute <= 15));
                })
                .sort((a, b) => a - b);
    
            let maxGap = 0;
            if (accessTimestamps.length > 1) {
                for (let i = 1; i < accessTimestamps.length; i++) {
                    const gap = accessTimestamps[i] - accessTimestamps[i - 1];
                    if (gap > maxGap) {
                        maxGap = gap;
                    }
                }
            }
            const longestPeriodWithoutUse = maxGap > 0 ? this.formatDuration(maxGap) : 'N/A';
    
            return {
                room_name: room.room_name,
                totalUses,
                averageStay: averageStay ? this.formatDuration(averageStay) + " hours" : 'N/A',
                absences,
                peakHour,
                longestPeriodWithoutUse,
            };
        }));
    
        return roomStats;
    }
}