import { Response } from 'express'

export interface ApiResponse {
    res: Response
    data?: any
}

export interface ErrorResponse {
    res: Response
    code: number
    data?: any
}

export interface IErrorResponses {
    [key: number]: {
        status: number,
        message: string,
    }
}


export const ERROR_STATUS_RESPONSES: IErrorResponses = {
    400: {
        status: 400,
        message: 'Required params are missing or invalid',
    },
    401: {
        status: 401,
        message: 'Unauthorized access',
    },
    402: {
        status: 402,
        message: 'Access not allowed',
    },
    403: {
        status: 403,
        message: 'Forbidden',
    },
    404: {
        status: 404,
        message: 'Not found',
    },
    405: {
        status: 405,
        message: 'Not allowed',
    },
    406: {
        status: 406,
        message: 'Not Acceptable',
    },
    407: {
        status: 407,
        message: 'sessionId has expired',
    },
    500: {
        status: 500,
        message: 'Internal Server Error',
    },
    501: {
        status: 501,
        message: 'Database error',
    },
    502: {
        status: 502,
        message: 'Bad Gateway',
    },
    503: {
        status: 503,
        message: 'Service Unavailable',
    },
    504: {
        status: 504,
        message: 'Duplicated items in database',
    },
    505: {
        status: 505,
        message: "Item doesn't exist",
    },
    506: {
        status: 506,
        message: "List doesn't exist",
    },
    507: {
        status: 507,
        message: "User doesn't have access to this list",
    },
    508: {
        status: 508,
        message: "Unable to find a user with this userId",
    },
    509: {
        status: 509,
        message: "Unable to access private lists",
    },
    510: {
        status: 510,
        message: "you are the owner of this list. Do not invite yourself",
    },
    511: {
        status: 511,
        message: "username already exists, please try another one",
    },
    512: {
        status: 512,
        message: "register username too be able to request to /user/*",
    },
    513: {
        status: 513,
        message: "only admin users can operate this",
    },
    514: {
        status: 514,
        message: "you cannot follow/unfollow yourself",
    },
    515: {
        status: 515,
        message: "user already followed",
    },
    516: {
        status: 516,
        message: "Either you are not the owner of this list or list doesn't exist",
    },
    517: {
        status: 517,
        message: "'wishlist', 'watchlist' and 'saved' cannot be deleted or edited and titles are reserved",
    },
    518: {
        status: 518,
        message: "list already followed",
    },
    519: {
        status: 519,
        message: "Username/Password is incorrect",
    },
    520: {
        status: 520,
        message: "you do not follow this list",
    },



    600: {
        status: 600,
        message: "you must add a conclusion to the last prompt",
    }
}
