"use client"
import { create } from 'zustand';
import getJwtTokenFromCookies from "./get-jwt-token";
import { persist, createJSONStorage } from 'zustand/middleware';
const jwtToken = getJwtTokenFromCookies()
interface token {
    token: string | null;
    changeToken: (token: string) => void;
}
export const useToken = create<token>((set) => ({
    token: jwtToken,
    changeToken: (tokenn: string) => set(() => ({
        token: tokenn
    })),
}));
// export const useStore = create
//     (persist<Store>
//         ((set) => ({
//             data: minimalProductArray,
//             setData: (datas: productsProp) => set((state) => (
//                 { data: datas }
//             ))
//         })
//             , {
//                 name: 'my-zustand-store',
//                 storage: createJSONStorage(() => localStorage)
//             }
//         )
//     )

