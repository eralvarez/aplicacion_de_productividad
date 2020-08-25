import * as Yup from 'yup';

const dialogFormSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    duration: Yup.number().integer().min(0),
    customMinutes: Yup.number().integer().min(0).max(119),
    customSeconds: Yup.number().integer().min(0).max(60),
});

export {
    dialogFormSchema,
};
