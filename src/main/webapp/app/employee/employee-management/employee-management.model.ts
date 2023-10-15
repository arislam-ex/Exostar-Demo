export interface IEmployee {
  id: number | null;
  employeeCode?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string | null;
  starRating?: string | null;
  login?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
}

export class Employee implements IEmployee {
  constructor(
    public id: number | null,
    public employeeCode?: string,
    public address?: string,
    public city?: string,
    public state?: string,
    public zip?: string,
    public starRating?: string,
    public login?: string,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date
  ) {}
}
