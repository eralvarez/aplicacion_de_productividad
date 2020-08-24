import * as Yup from 'yup';

const dialogFormSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string(),
    duration: Yup.number().integer().positive().required(),
    customMinutes: Yup.number().integer().min(0).max(119),
    customSeconds: Yup.number().integer().min(0).max(60),
});

export {
    dialogFormSchema,
};
