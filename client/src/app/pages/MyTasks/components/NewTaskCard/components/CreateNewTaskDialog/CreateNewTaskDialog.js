import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    // FormControl,
    // InputLabel,
    // Input,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from '@material-ui/core';
import { useFormik } from 'formik';
// import * as Yup from 'yup';

import './CreateNewTaskDialog.scss';
import { dialogFormSchema } from './form.schema';

// const formik = useFormik({
//     initialValues: {
//         title: '',
//         description: '',
//         duration: 0,
//     },
//     validationSchema: dialogFormSchema,
//     onSubmit: (values) => {
//         console.log(values);
//         // alert(JSON.stringify(values, null, 2));
//     },
// });

class CreateNewTaskDialog extends React.Component {

    // formik = useFormik({
    //     initialValues: {
    //         title: '',
    //         description: '',
    //         duration: 0,
    //     },
    //     validationSchema: dialogFormSchema,
    //     onSubmit: (values) => {
    //         console.log(values);
    //         // alert(JSON.stringify(values, null, 2));
    //     },
    // });

    durationOptions = [
        {
            value: 60 * 30,
            label: 'Short (30 mins)',
        },
        {
            value: 60 * 45,
            label: 'Medium (45 mins)',
        },
        {
            value: 60 * 60,
            label: 'Long (1 hr)',
        },
        {
            value: 0,
            label: 'Custom',
        },
    ];

    inputLabelProps = {
        shrink: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            onClose: props.onClose,
            customDuration: false,
        };

        this.handleClose = this.handleClose.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
    }

    handleClose() {
        this.state.onClose(false);
        this.setState({
            customDuration: false,
        });
    }

    onChangeDuration(event) {
        if (event.target.value === 0) {
            this.setState({
                customDuration: true,
            });
        } else {
            this.setState({
                customDuration: false,
            });
        }
    }

    render() {
        // const formik = useFormik({
        //     initialValues: {
        //         title: '',
        //         description: '',
        //         duration: 0,
        //     },
        //     validationSchema: dialogFormSchema,
        //     onSubmit: (values) => {
        //         console.log(values);
        //         // alert(JSON.stringify(values, null, 2));
        //     },
        // });

        return (
            <Dialog
                onClose={this.handleClose}
                fullWidth={true}
                maxWidth="sm"
                open={this.props.open}
                className="CreateNewTaskDialog">
                <DialogTitle>Set backup account</DialogTitle>

                <DialogContent>
                    <form noValidate autoComplete="off" >
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            className="form-space"
                            fullWidth
                            // onChange={this.formik.handleChange}
                            // value={this.formik.values.title}
                            InputLabelProps={this.inputLabelProps}
                        />
                        {/* error={this.formik.touched.title && this.formik.errors.title}
                        helperText={String(this.formik.errors.title)} */}

                        {/* <TextField
                            id="description"
                            name="description"
                            label="Description"
                            className="form-space"
                            multiline
                            fullWidth
                            rowsMax={4}
                            InputLabelProps={this.inputLabelProps}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />

                        <TextField
                            id="duration"
                            name="duration"
                            select
                            label="Duration"
                            className="form-space block"
                            onChange={this.onChangeDuration}
                            InputLabelProps={this.inputLabelProps}>
                            {this.durationOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {this.state.customDuration === true &&
                            <>
                                <TextField
                                    id="customMinutes"
                                    name="customMinutes"
                                    label="Minutes"
                                    type="number"
                                    className="custom-minutes"
                                    InputLabelProps={this.inputLabelProps}
                                    defaultValue="0"
                                    inputProps={{
                                        min: 0,
                                        max: 119,
                                    }}
                                />

                                <TextField
                                    id="customSeconds"
                                    name="customSeconds"
                                    label="Seconds"
                                    type="number"
                                    className="custom-seconds"
                                    InputLabelProps={this.inputLabelProps}
                                    defaultValue="0"
                                    inputProps={{
                                        min: 0,
                                        max: 60,
                                    }}
                                />
                            </>
                        } */}

                        <DialogActions>
                            <Button color="primary">
                                Cancel
                            </Button>
                            <Button color="primary">
                                Subscribe
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
}

export default CreateNewTaskDialog;
