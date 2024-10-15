import express from "express";

import { prismaClient } from "../services";

export class LoginController {
  /** Separate class to handle the request and responses from our Express server
   * True authentication is not a requirement so we're ok with just checking
   * the provdided user credential - their name - and returning the user payload
   * if it's valid, or rejecting the request if there's no such user with the credential
   *
   * No separate business logic layer because it's just basic not-real authentication
   */

  public static async handleLoginForCoach(
    request: express.Request,
    response: express.Response
  ) {
    try {
      const username = request.body.username;
      const foundCoach = await prismaClient.coach.findFirst({
        where: { name: username },
      });

      if (foundCoach) {
        return response.status(200).json(foundCoach);
      }

      return response
        .status(404)
        .json("Could not find coach with that credential");
    } catch (error) {
      return response
        .status(400)
        .json("Could not find coach with that credential");
    }
  }

  public static async handleLoginForStudent(
    request: express.Request,
    response: express.Response
  ) {
    try {
      const username = request.body.username;
      const foundStudent = await prismaClient.student.findFirst({
        where: { name: username },
      });

      if (foundStudent) {
        return response.status(200).json(foundStudent);
      }

      return response
        .status(404)
        .json("Could not find student with that credential");
    } catch (error) {
      return response
        .status(400)
        .json("Could not find student with that credential");
    }
  }
}
