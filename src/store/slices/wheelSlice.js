"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = exports.changeState = exports.selectCurrentStatus = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    status: "stay",
    currentPrizes: ["Jackpot", "250", "400", "10", "100", "150", "200", "750"]
};
const wheelSlice = (0, toolkit_1.createSlice)({
    name: "wheel",
    initialState,
    reducers: {
        changeState: (state) => {
            console.log('changed');
            return Object.assign(Object.assign({}, state), { status: (state.status === "stay" ? "spinning" : state.status === "spinning" ? "braking" : "stay") });
        },
        stop: (state, action) => {
            return Object.assign(Object.assign({}, state), { status: "stay" });
        }
    }
});
const selectCurrentStatus = (state) => state.wheel.status;
exports.selectCurrentStatus = selectCurrentStatus;
_a = wheelSlice.actions, exports.changeState = _a.changeState, exports.stop = _a.stop;
exports.default = wheelSlice;
