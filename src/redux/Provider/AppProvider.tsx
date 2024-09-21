import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

export const AppContext = createContext({})

export const AppProvider = ({ children }: any) => {


    return (
        <AppContext.Provider
        
            value={{
                //global states goes here
                //e.g:
                // state,
                // setstate,
            }}
        >
{children}
        </AppContext.Provider>
    )
}
