var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import store from "./store/store.js";
import { Provider } from "react-redux";
// Init VK  Mini App
bridge.send("VKWebAppInit");
ReactDOM.render(_jsx(Provider, __assign({ store: store }, { children: _jsx(App, {}) })), document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
    import("./eruda").then(function (_a) {
        var eruda = _a.default;
    }); //runtime download
}
