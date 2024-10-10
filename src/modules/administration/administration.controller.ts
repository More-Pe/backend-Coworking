import { Request, Response } from 'express';
import { AdministrationService } from './administration.service';

export const generateDailyReport = async (req: Request, res: Response) => {
    try {
        const { report_date } = req.body;
        const date = report_date ? new Date(report_date) : new Date();
        
        if (isNaN(date.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid report_date provided',
            });
        }

        const report = await AdministrationService.generateDailyReport(date);

        return res.status(200).json({
            success: true,
            message: 'Daily report generated successfully',
            data: report,
        });
    } catch (error: any) {
        console.error('Error in generateDailyReport:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Error generating daily report',
        });
    }
};

export const getReportsInRange = async (req: Request, res: Response) => {
    try {
        const { start_date, end_date } = req.query;

        if (!start_date || !end_date) {
            return res.status(400).json({
                success: false,
                message: 'start_date and end_date are required query parameters',
            });
        }

        const startDate = String(start_date);
        const endDate = String(end_date);
        const reports = await AdministrationService.getReportsInRange(startDate, endDate);

        return res.status(200).json({
            success: true,
            message: 'Reports retrieved successfully',
            data: reports,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Error retrieving reports',
        });
    }
};

export const getRoomUsageStats = async (req: Request, res: Response) => {
    try {
        const stats = await AdministrationService.getRoomUsageStats();

        if (stats.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No room usage data found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Room usage statistics retrieved successfully',
            data: stats,
        });
    } catch (error: any) {
        console.error('Error in getRoomUsageStats:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving room usage statistics',
            error: error.message,
        });
    }
};