export interface IUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
  products: string[]; // רשימת מזהים של מוצרים
  profileCompleted: boolean;
  createdAt: string; // תאריך נשלח כ-ISO String
  updatedAt?: string;
}
