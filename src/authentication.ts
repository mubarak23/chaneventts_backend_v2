import { Request } from "express";
// import { User } from "./entity/User";


export function expressAuthentication(request: Request, securityName: string, scopes?: string[]): Promise<any> {
  const token = request.headers["x-access-token"] as string;
  const jwtSecret = (process.env.JWT_SECRET as string) || 'rth5766d'
  return new Promise((resolve, reject) =>
  true
  );
  
  // return new Promise((resolve, reject) => {
  //   if (!token) {
  //     reject(new Error("Swagger Error! No token provided"));
  //   }
  //   jwt.verify(token, jwtSecret, function (err: any, decoded: any) {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       (async () => {
  //         const { uuid } = decoded;

  //          const userRepo = getRepository(User);
  //         const currentUser = await userRepo.findOne({ uuid });

  //         if (!currentUser) {
  //           return reject(ErrorMessages.USER_NON_EXISTENCE);
  //         }
  //         resolve(currentUser);
  //       })();
  //     }
  //   });
  // });
}
