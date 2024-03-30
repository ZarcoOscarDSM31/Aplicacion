import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es obligatorio',
    }).min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres',
    }).max(20, {
        message: 'El nombre de usuario debe tener menos de 20 caracteres',
    }),
    email: z.string({
        required_error: 'El correo es obligatorio',
    }).email({
        message: 'El correo no es válido',
    }),
    password: z.string({
        required_error: 'La contraseña es obligatoria',
    }).min(5, {
        message: 'La contraseña debe tener al menos 5 caracteres',
    }).max(20, {
        message: 'La contraseña debe tener menos de 20 caracteres',
    }),
    avatar: z.string().optional()
});


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
});
