import type { Request, Response } from "express";
export declare const getEvents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getEventById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const UpdateEvent: (req: Request, res: Response) => Promise<void>;
export declare const deleteEvent: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=EventControllers.d.ts.map