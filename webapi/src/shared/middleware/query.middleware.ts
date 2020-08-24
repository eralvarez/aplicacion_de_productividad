import { Request, Response, NextFunction } from 'express';

/**
 * Basically we convert all strings to true types of the req.query object
 */
function queryMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const queryKeys = Object.keys(req.query);
        if (queryKeys.length > 0) {
            for (let keyIndex = 0; keyIndex < queryKeys.length; keyIndex++) {
                const key = queryKeys[keyIndex];
                let queryParam: any = req.query[key];

                if (queryParam === 'true') {
                    queryParam = true;
                } else if (queryParam === 'false') {
                    queryParam = false;
                } else if (!isNaN(Number(req.query[key]))) {
                    queryParam = Number(req.query[key]);
                }

                req.query[key] = queryParam;
            }
        }

        next();
    }
}

export {
    queryMiddleware
};
