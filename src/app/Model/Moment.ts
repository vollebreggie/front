import {User} from './User';
import {Club} from './Club';
import {MomentPart} from './MomentPart';

export interface Moment {

    id : number;
    title: String;
    user: User;
    picture: String;
    club: Club;
    friends: User[];
    privacy: String;
    momentParts: MomentPart[];

}