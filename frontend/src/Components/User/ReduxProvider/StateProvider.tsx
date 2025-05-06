"use client";
import { store } from "@/Store/store";
import React from "react";
import { Provider } from "react-redux";

function StateProvider({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
}

export default StateProvider;
