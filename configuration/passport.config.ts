import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { Application } from "express";
import userService from "../src/services/user.service";
import userRepo from "../src/controllers/user.controller";
import { User } from "../src/models/user.model";
import { Model } from "sequelize/types";
// const { DataTypes } = require("sequelize");
const LocalStrategy = require("passport-local").Strategy;

export default (passport: any) => {
 return  passport.use(
    new LocalStrategy({usernameField:'email'},function (email: string, password: string, done: any) {
      console.log("&&",password);

    return  User.findByPk(email).then((user: Model <{comparePassword: (password, cb)=> {}}> ) => {
        if (!user) {
          return done(null, false);
        }
        (user as any).comparePassword(password, (userData) => {
          console.log('>> userData', userData);
          return done(null, userData);
        })
        
      }).catch(err => console.error(err) )
    })
  );

  // passport.serializeUser((user: any, done) => {
  //   done(null, user.email);
  // });

  // passport.deserializeUser(async (email: any, done) => {
  //   // TODO: Fetch user from DB
  //   const user = await userRepo.getOne(email);
  //   if (user) done(null, user);
  //   else done(null, false);
  // });
};
