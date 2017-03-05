import {Class} from './Class';
import {Club} from './Club';
import {Photo} from './Photo';

export interface User {
  id: number;
  username: String;
  password: String;
  gender: String;
  nickname: String;
  phone: String;
  wechat: String;
  email: String;
  role: String;
  //class: Class;
  club: Club;
  photo: Photo;
}