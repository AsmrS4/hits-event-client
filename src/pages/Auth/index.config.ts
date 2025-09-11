import z from 'zod'

export const loginSchema = z.object({
    login: z.string()
        .trim()
        .min(3, {message: "Минимальная длина логина - 3 символа!"})
        .nonempty({message: 'Поле обязательно к заполнению'}),
    password: z.string()
        .trim()
        .min(8, {message: 'Минимальная длина пароля - 8 символов!'})
        .nonempty({message: 'Поле обязательно к заполнению'})
})

export type LoginSchema = z.infer<typeof loginSchema>