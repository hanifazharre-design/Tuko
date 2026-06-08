import type { Request, Response } from "express";
export declare const getAllCategories: (req: Request, res: Response) => Promise<void>;
export declare const createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCategoryById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCategoryById: (req: Request, res: Response) => Promise<void>;
export declare const deleteCategoryById: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=categoryController.d.ts.map