import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from '@material-ui/core';
import { Formik, Form } from 'formik';

import tasksService from '../../../../../../shared/services/tasks/tasks.service';
import './EditTaskDialog.scss';
import { dialogFormSchema } from './form.schema';


class EditTaskDialog extends React.Component {

    durationOptions = [
        {
            value: 1800,
            label: 'Short (30 mins)',
        },
        {
            value: 2700,
            label: 'Medium (45 mins)',
        },
        {
            value: 3600,
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
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

    handleFormSubmit(values, actions) {
        let taskDuration = (values.duration !== 0) ? values.duration : values.customMinutes * 60 + values.customSeconds;
        taskDuration = (taskDuration > 7200) ? 7200 : taskDuration;

        const form = {
            description: values.description,
            duration: taskDuration,
        };
        tasksService.update(this.props.taskIdToEdit, form).then(() => {
            tasksService.getEditTaskSubject().next(form);
            this.handleClose();
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                fullWidth={true}
                maxWidth="sm"
                open={this.props.open}
                className="EditTaskDialog">
                <DialogTitle>Update task</DialogTitle>

                <DialogContent>
                    <Formik
                        initialValues={{
                            description: '',
                            duration: this.durationOptions[0].value,
                            customMinutes: 0,
                            customSeconds: 0,
                        }}
                        validationSchema={dialogFormSchema}
                        onSubmit={this.handleFormSubmit}>
                        {props => {
                            const { handleChange, values, errors, getFieldProps, touched } = props;
                            return (
                                <Form>
                                    <TextField
                                        id="description"
                                        name="description"
                                        label="Description"
                                        className="form-space"
                                        multiline
                                        fullWidth
                                        rowsMax={4}
                                        InputLabelProps={this.inputLabelProps}
                                        helperText={errors.description && touched.description ? errors.description : null}
                                        error={errors.description && touched.description ? true : false}
                                        {...getFieldProps('description')}
                                    />
    
                                    <TextField
                                        select
                                        id="duration"
                                        name="duration"
                                        label="Duration"
                                        value={props.values.duration}
                                        className="form-space block"
                                        InputLabelProps={this.inputLabelProps}
                                        helperText={errors.duration && touched.duration ? errors.duration : null}
                                        error={errors.duration && touched.duration ? true : false}
                                        onChange={selectedOption => {
                                            handleChange('duration')(selectedOption);
                                        }}>
                                        {this.durationOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
    
                                    {values.duration === 0 &&
                                        <div>
                                            <TextField
                                                id="customMinutes"
                                                name="customMinutes"
                                                label="Minutes"
                                                type="number"
                                                className="custom-minutes"
                                                InputLabelProps={this.inputLabelProps}
                                                inputProps={{
                                                    min: 0,
                                                    max: 119,
                                                }}
                                                {...getFieldProps('customMinutes')}
                                            />
    
                                            <TextField
                                                id="customSeconds"
                                                name="customSeconds"
                                                label="Seconds"
                                                type="number"
                                                className="custom-seconds"
                                                InputLabelProps={this.inputLabelProps}
                                                inputProps={{
                                                    min: 0,
                                                    max: 60,
                                                }}
                                                {...getFieldProps('customSeconds')}
                                            />
                                        </div>
                                    }
    
                                    <DialogActions>
                                        <Button color="secondary" onClick={this.handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained" color="primary" type="submit">
                                            Update
                                        </Button>
                                    </DialogActions>
                                </Form>
                            )
                        }}
                    </Formik>
                </DialogContent>
            </Dialog>
        );
    }
}

export default EditTaskDialog;
