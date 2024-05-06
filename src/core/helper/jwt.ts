import { Injectable } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken";
import { Config } from "../config/config"

interface JwtResponse {
     success: boolean,
     token?: string,
     data?: any
}

@Injectable()
export class JwtService {

     /**
      * Generate JWT token (Algorithm HS256)
      */
     async generateJWTToken(object: { payload: object, expiry_time?: string }) {
          try {
               const token = sign(object.payload, Config.jwtSecretKey, { ...(object.expiry_time) && { expiresIn: object.expiry_time } });

               const response: JwtResponse = {
                    success: true,
                    token
               };
               return response
          } catch (error) {
               console.log('error in createJWTToken :>> ', error);
               const response: JwtResponse = {
                    success: false
               };
               return response;
          }
     };

     /**
     * Verify JWT token (Algorithm HS256)
     */
     async verifyJWTToken(token: string) {
          try {
               const data = verify(token, Config.jwtSecretKey);
               const response: JwtResponse = {
                    success: true,
                    data
               };
               return response
          } catch (error) {
               console.log('error in verifyJWTToken :>> ', error);
               const response: JwtResponse = {
                    success: false
               };
               return response;
          }
     };
};