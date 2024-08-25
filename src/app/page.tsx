
'use client'
import Image from "next/image";
import Opportunities from "./posts/page";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
export default function Home() {
  return (
    <Provider store = {store}>
       <Opportunities />
    </Provider>
   
  );
}
