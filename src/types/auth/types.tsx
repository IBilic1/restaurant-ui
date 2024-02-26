export type LoginRequest = {
    email: string;
    password: string;
};
export type SignUpRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "USER";
};

export type AuthResponse = {
    access_token: string;
    refresh_token: string;
};

export type User = {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
};

export type Owner = {
    email: string;
    password?: string;
};

export type Restaurant = {
    id?: string;
    name?: string;
    owner?: Owner;
    desks?: Desk[];
};

export type Ingredient = {
    id?: string;
    name?: string;
};

export type Dish = {
    id?: string;
    name?: string;
    ingredients?: Ingredient[];
    ingredientsHelper?: string[];
    restaurant?: Restaurant;
};

export type Desk = {
    id?: string;
    size?: number;
    restaurant?: Restaurant;
};

export type Reservation = {
    id?: string;
    reservedBy?: User;
    desk?: Desk;
    reservationTime?: string;
};

export type Order = {
    id?: string;
    orderBy?: User;
    dishes?: Dish[];
    orderTime?: string;
};
