import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface Admin {
  email: string;
  password: string;
}

export const login = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Set a cookie to remember the user is logged in
    (await cookies()).set('admin-session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return { success: true };
  }

  return { success: false, error: 'Invalid email or password' };
};

export const logout = async () => {
  (await cookies()).delete('admin-session');
  redirect('/admin/login');
};

export const isAuthenticated = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  return session?.value === 'true';
};

export const requireAuth = async () => {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }
}; 