import type {
  AuthBindings,
  ForgotPasswordFormTypes,
  LoginFormTypes,
  RegisterFormTypes,
  UpdatePasswordFormTypes,
} from "@refinedev/core";
import nookies from "nookies";

import { supabaseClient } from "./supabaseClient";

export const COOKIES_KEY = "dicari_token";

export const authProvider: AuthBindings = {
  login: async ({ email, password }: Required<LoginFormTypes>) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error,
      };
    }

    if (data?.session) {
      nookies.set(null, COOKIES_KEY, data.session.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      return {
        success: true,
        redirectTo: "/dashboard",
      };
    }

    // for third-party login
    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    nookies.destroy(null, COOKIES_KEY);
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  register: async ({ email, password }: Required<RegisterFormTypes>) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          redirectTo: "/login",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async ({ email }: Required<ForgotPasswordFormTypes>) => {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/password/update",
    });

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return { success: true };
  },
  updatePassword: async ({ password }: Required<UpdatePasswordFormTypes>) => {
    return { success: false };
  },
  check: async (jwt) => {
    const { data } = await supabaseClient.auth.getUser(jwt);
    const { user } = data;

    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const user = await supabaseClient.auth.getUser();

    if (user) {
      return user.data.user?.role;
    }

    return null;
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return {
        ...data.user,
        name: data.user.email,
      };
    }

    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
