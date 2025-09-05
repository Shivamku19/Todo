import { createContext } from "react";

 export const todoitemcontext =createContext([{
      todoitems:[],
      addnewitem:() =>{},
      deleteitem:() =>{},

    }]);