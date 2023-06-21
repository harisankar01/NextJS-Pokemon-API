import { initializeApp } from "firebase/app";

export const getApp=()=>{

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_TOKEN_apiKey,
        authDomain: process.env.NEXT_PUBLIC_TOKEN_authDomain,
        projectId: process.env.NEXT_PUBLIC_TOKEN_projectId,
        storageBucket: process.env.NEXT_PUBLIC_TOKEN_storageBucket,
        messagingSenderId: process.env.NEXT_PUBLIC_TOKEN_messagingSenderId,
        appId: process.env.NEXT_PUBLIC_TOKEN_appId,
        measurementId: process.env.NEXT_PUBLIC_TOKEN_measurementId
    };

    const app = initializeApp(firebaseConfig);
    return app;
}
