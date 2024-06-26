import { IsEmail, IsString, MinLength, IsNotEmpty, ValidateIf } from 'class-validator';


interface Gender {
    male: string;
    female: string;
}


/**
 * Register User DTO
 */
export class RegisterUserDTO {
    /**
     * firstName
     */
    @IsString()
    @IsNotEmpty({
        message: 'FirstName is required'
    })
    name: string;


    /**
     * lastName
     */
    @IsString()
    @IsNotEmpty({
        message: 'Gender is required'
    })
    gender: Gender;


    /**
     * email
     */
    @IsEmail({},
        { message: 'Please use valid email' }
    )
    @IsNotEmpty({
        message: 'Email is required'
    })
    email: string;


    /**
     * password
     */
    @IsString()
    @MinLength(8, {
        message: "Please enter minimum 8 character and strong password."
    })
    @IsNotEmpty({
        message: 'Password is required'
    })
    password: string;

};

/**
 * Register User DTO
 */
export class LoginDTO {
    /**
     * email
     */
    @IsEmail({},
        { message: 'Please use valid email' }
    )
    @IsNotEmpty({
        message: 'Email is required'
    })
    email: string;


    /**
     * password
     */
    @IsString()
    @MinLength(8, {
        message: "Please enter minimum 8 character and strong password."
    })
    @IsNotEmpty({
        message: 'Password is required'
    })
    password: string;

};


/**
 * Update User DTO
 */
export class UpdateUserDTO {
    /**
     * firstName
     */
    @IsString()
    firstName?: string;

    /**
     * lastName
     */
    @IsString()
    lastName?: string;

    /**
     * new password
     */
    @IsString()
    newPassword?: string;

    /**
     * current password
     */
    @IsString({
        message: 'Current password must be a string'
    })
    @IsNotEmpty({
        message: 'Current password is required'
    })
    @ValidateIf((object, value) => object.newPassword !== undefined)
    currentPassword?: string;

};










