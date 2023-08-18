import * as Yup from 'yup';

// Types
export type SignInProps = {
  email: string;
  password: string;
};

export type SignUpProps = {
  firstname: string;
  lastname: string;
  department: string;
  email: string;
  password: string;
};

export type UserResponseDto = {
  firstname: string,
  lastname: string,
  email: string,
  department:	string,
  id:	string,
  isAdmin: boolean,
  createdAt:	string,
  updatedAt:	string  
}

export enum Departments {
  CodingSchool = "CodingSchool",
  Diamir = "Diamir",
  WebundSoehne = "WebundSoehne",
  DarwinsLab = "DarwinsLab",
  DeepDive = "DeepDive",
  TailoredApps = "TailoredApps",
}

export interface OfficeProps {
  desks: any;
  description?: string | null;
  name: string;
  columns: number;
  rows: number;
  id: string;
  map: string;
  createdAt: string;
  updatedAt: string;
}
export type DeskProps = [{
  id: string,
  label: string,
  type: string,
  createdAt: string,
  updatedAt: string,
  column: number,
  row: number,
  equipment: Array <string>
  fixdesk: object,
  office: {
      columns: number,
      createdAt: string,
      id: string,
      map: string,
      name: string
      rows: number,
      updatedAt: string
  }
  nextBooking: string,
  isUserFavourite: boolean
}]

export interface OfficeDeskProps {
  id: string;
  name: string;
  map: string;
  columns: number;
  rows: number;
  createdAt: string;
  updatedAt: string;
  desks: DeskType[];
}

export enum DeskType {
  Fix = "fix",
  Flex = "flex",
}

export interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;
}

export type DeskRequestDto = {
  label:	string,
  office:	string, 
  equipment: Array <string>,
  bookings: [
    {
      dateStart: string,
      dateEnd: string,
      id: string,
      user: {
        firstname: string,
        lastname: string,
        email: string,
        department: string,
        id: string,
        isAdmin: boolean,
        createdAt: string,
        updatedAt: string
      },
      bookedAt: string

    }
  ],
}

export type BookingRequest = {
  dateStart:string,
  dateEnd: string,
  desk: string
}
        
export type FixDeskResponse = {
  id: string,
  user: string,
  desk: string,
  status: string,
  createdAt: string,
  updatedAt: string
}

 export interface User {
  description?: string | null;
  firstname: string;
  lastname: string;
  email: string;
  department: Departments[];
  id: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
  
export interface FavouriteResponseDto {
  id: string;
  user: UserResponseDto;
  desk: Desk;
  createdAt: string;
  updatedAt: string;
}

export interface Desk {
  description?: string | null;
  label: string;
  id: string;
  equipment: Equipment[];
  type: DeskType[];
  office: OfficeDeskProps;
  createdAt: string;
  updatedAt: string;
}
  
export interface FavouriteRequestDto {
  desk: string;
}
  
export interface FavouriteResponseCreateDto {
  id: string;
  user: string;
  desk: string;
  createdAt: string;
  updatedAt: string;
}
  
export interface BookingResponseDto {
  dateStart: string;
  dateEnd: string;
  id: string | undefined;
  user: User;
  desk: Desk;
  bookedAt: string;
}

export enum Equipment {
  HDMI = "HDMI",
  USB_C = "USB C",
  HEIGHT_ADJUSTABLE = "Height Adjustable",
  LAPTOP_DOCK = "Laptop Dock",
  MONITOR = "Monitor",
  MONITOR_2 = "Monitor 2",
}

export interface UpdateOffice {
  name: string,
  columns:number,
  rows:number,
}

export interface DeskResponseUserSpecificDto {
  label: string;
  id: string;
  nextBooking: string;
  fixdesk?: FixdeskRequest[] | null;
  createdAt: string;
  status: string;
  bookings: BookingResponseDto[];
  updatedAt: string;
  type: DeskType[];
  isUserFavourite: boolean;
  office: OfficeProps;
  equipment: Equipment[];
}
export interface FixdeskRequest {
  description?: string | null;
  id: string;
  user: User;
  createdAt: string;
  status: string;
  updatedAt: string;
  updatedBy: User;
}

export interface CreateOfficeProps {
  onCreate: (office: any) => void;
}

export interface FixDeskApprovalProps {
  id: string,
  user: {
    firstname: string,
    lastname: string,
    email: string,
    department: string,
    id: string,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string
  },
  desk: {
    label: string,
    id: string,
    equipment: Equipment[],
    type: string,
    row: number,
    column: number,
    createdAt: string,
    updatedAt: string
  },
  status: string,
  createdAt: string,
  updatedAt: string,
  updatedBy: {
    firstname: string,
    lastname: string,
    email: string,
    department: string,
    id: string,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string
  }
}

export interface CreateOfficeProps {
  name: string;
  columns: number;
  rows: number;
}
  
export interface CommentCreate {
  comment: string;
  desk: string;
}

export interface CommentResponseDto {
  comment: string;
  id: string;
  user: User;
  desk: Desk;
  commentedAt: string;
  updatedAt: string;
}

export const CreateDeskSchema = Yup.object().shape({
  label: Yup.string().max(12, 'maximum 12 characters').required('Label is required'),
  office: Yup.string().required('Office is required'),
  equipment: Yup.array()
    .of(Yup.string().oneOf(Object.values(Equipment), 'Invalid equipment type'))
    .min(1, 'At least one equipment type is required')
    .required('Equipment is required'),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(7, 'Password must be at least 7 characters').required('Password ist required'),
});
  
export const SignUpSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  department: Yup.string().required('Department is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
});
  
export const OfficeSchema = Yup.object().shape({
  name: Yup.string().max(12, 'maximum 12 characters').required('Name is required'),
  columns: Yup.number().min(1, 'Columns must be at least 1').required('Columns is required'),
  rows: Yup.number().min(1, 'Rows must be at least 1').required('Rows is required'),
});

export const BookingSchema = Yup.object().shape({
  dateStart: Yup.string().required('Start Date is required'),
  dateEnd: Yup.string().required('End Date is required'),
  desk: Yup.string().required('Desk is required'),
});