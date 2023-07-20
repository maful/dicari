import type {
  AuthBindings,
  ForgotPasswordFormTypes,
  LoginFormTypes,
  RegisterFormTypes,
  UpdatePasswordFormTypes,
} from "@refinedev/core";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabaseClient = createClientComponentClient();

export const authProvider: AuthBindings = {
  login: async ({ email, password }: Required<LoginFormTypes>) => {
    try {
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

      if (data?.user) {
        return { success: true, redirectTo: "/app" };
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
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },
  register: async ({ email, password }: Required<RegisterFormTypes>) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            role: "admin",
          },
        },
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
  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;

      if (!session) {
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Session not found",
          },
          logout: true,
          redirectTo: "/login",
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error || {
          message: "Check failed",
          name: "Session not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    const user = await supabaseClient.auth.getUser();

    if (user) {
      return user.data.user?.user_metadata.role ?? "candidate";
    }

    return null;
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return data.user;
    }

    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
