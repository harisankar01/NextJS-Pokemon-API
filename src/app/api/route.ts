import { NextResponse } from 'next/server'
 import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getApp } from '@/services/db';
import {SignJWT} from 'jose';

export async function POST(request: Request) {
  try{
      const app = getApp();
      const auth = getAuth(app);
      const body= await request.json()
      const secretKey: string = process.env.TOKEN as string;
      const userCredential = await signInWithEmailAndPassword(auth, body.email,  body.pwd);
      const user = userCredential.user;
      const accessToken = await user.getIdToken();
      const iat = Math.floor(Date.now() / 1000);
      const exp = iat + 60* 60 * 3; // three hour
      const token = await new SignJWT({accessToken})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secretKey));
      return NextResponse.json({ status: "Success", token,  uid: user?.uid || '' })
    }
    catch(error){
      console.log(error);
      return NextResponse.json({ status: "Failed", error })
    }
}