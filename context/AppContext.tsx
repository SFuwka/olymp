// src/context/state.js
import React, { createContext, useContext, useState } from 'react';

interface AppWrapperProps {
    children: React.ReactNode
}

type state = {
    TrialRequestSended: boolean
}

interface IContext {
    state: { TrialRequestSended: boolean }
    setState: React.Dispatch<React.SetStateAction<state>>
}

const AppContext = createContext<IContext>({ state: { TrialRequestSended: false }, setState: () => { } });

export function AppWrapper({ children }: AppWrapperProps) {
    let [state, setState] = useState({ TrialRequestSended: false })

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}