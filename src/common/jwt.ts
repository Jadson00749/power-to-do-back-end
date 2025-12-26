import * as jwt from 'jsonwebtoken';

export function jwtDecode(req:any){
  let token = req.headers['authorization'].split(' ')[1]
  
  if(token) return jwt.decode(token)
}