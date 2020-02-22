import {USERS , POSTID} from '../Types'

const PORT = "3600" ;
const PROTOCOL = "http" ;
const HOST = "localhost" ;


export const URLS = {
    [USERS] : `${PROTOCOL}://${HOST}:${PORT}/api/user`,
    [POSTID] : `${PROTOCOL}://${HOST}:${PORT}/api/id `
};


