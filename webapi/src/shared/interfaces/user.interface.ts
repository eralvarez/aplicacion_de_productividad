interface IUserPublic {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export {
    IUserPublic
};
