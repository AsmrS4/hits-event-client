import z from 'zod'

export const profileSchema = z.object({
    firstName: z.string()
        .trim()
        .nonempty({message: 'Поле обязательно к заполнению'}),
    lastName: z.string()
        .trim()
        .nonempty({message: 'Поле обязательно к заполнению'})
})

export const companySchema = z.object({
    name: z.string()
        .trim()
        .nonempty({message: 'Поле обязательно к заполнению'}),
})

export type ProfileSchema = z.infer<typeof profileSchema>
export type CompanySchema = z.infer<typeof companySchema>