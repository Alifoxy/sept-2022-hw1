import { EEmailActions } from "../enums";

export const allTemplates: {
    [key: string]: { subject: string; templateName: string };
} = {
    [EEmailActions.WELCOME]: {
        subject: "We glad to see you in our app!",
        templateName: "register",
    },
    [EEmailActions.FORGOT_PASSWORD]: {
        subject:
            "Your password is under control, just follow all steps and everything will be fine",
        templateName: "forgotPassword",
    },
};