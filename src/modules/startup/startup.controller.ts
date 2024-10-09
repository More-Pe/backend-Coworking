import { Request, Response } from 'express';
import { StartupService } from './startup.service';
import { Program } from './startup.entity';

export const getAllStartups = async (req: Request, res: Response) => {
  try {
    const startups = await StartupService.getStartups();
    return res.status(200).json({
      success: true,
      message: 'Startups retrieved successfully',
      data: startups,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Error retrieving startups',
    });
  }
};

export const getStartupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const startup = await StartupService.getStartupById(Number(id));
    return res.status(200).json({
      success: true,
      message: 'Startup retrieved successfully',
      data: startup,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Error retrieving startup',
    });
  }
};

export const createStartup = async (req: Request, res: Response) => {
    try {
      const startupData = req.body;
      if (!startupData.program || !Object.values(Program).includes(startupData.program)) {
        return res.status(400).json({
          success: false,
          message: `Invalid program. Should be one of this: ${Object.values(Program).join(', ')}`,
        });
      }
      const newStartup = await StartupService.createStartup(startupData);
      return res.status(201).json({
        success: true,
        message: 'Startup created successfully',
        data: newStartup,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Error creating startup',
      });
    }
  };
  
  export const updateStartup = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const startupData = req.body;
      if (startupData.program && !Object.values(Program).includes(startupData.program)) {
        return res.status(400).json({
          success: false,
          message: `Invalid program. Should be one of this: ${Object.values(Program).join(', ')}`,
        });
      }
      const updatedStartup = await StartupService.updateStartup(Number(id), startupData);
      return res.status(200).json({
        success: true,
        message: 'Startup updated successfully',
        data: updatedStartup,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Error updating startup',
      });
    }
  };

export const deleteStartup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await StartupService.deleteStartup(Number(id));
    return res.status(200).json({
      success: true,
      message: 'Startup deleted successfully',
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Error deleting startup',
    });
  }
};

export const getPersonsByStartupId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persons = await StartupService.getPersonsByStartupId(Number(id));
    return res.status(200).json({
      success: true,
      message: 'Persons retrieved successfully',
      data: persons,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Error retrieving persons',
    });
  }
};