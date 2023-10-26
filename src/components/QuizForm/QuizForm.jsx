import React from 'react'
import { Formik } from 'formik';
import { StyledForm, StyledField, StylesError } from './QuizForm.styled';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    topic: Yup.string()
        .min(1, 'Too Short!')
        .required('Required'),
    level: Yup.string()
        .oneOf(['beginner', 'intermediate', 'advanced'])
        .required('Required'),
    time: Yup.number()
        .positive('Must be >0')
        .min(10, 'Not enough time!')
        .required('Required'),
    question: Yup.number()
        .positive('Must be >0')
        .min(3, 'Min 3 q!')
        .required('Required'),
});

export const QuizForm = () => {
    return (
        <Formik
            initialValues={{
                topic: '',
                level: 'beginner',
                time: 0,
                question: 0,
            }}
            validationSchema={schema}
            onSubmit={values => {
                console.log(values)
            }}
        >
            <StyledForm>
                <label>
                    Topic
                    <StyledField name="topic" placeholder="Quiz topic..." />
                    <StylesError name="topic" component="div" />
                </label>

                <label>
                    Level
                    <StyledField as="select" name="level">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </StyledField>
                    <StylesError name="level" component="div" />
                </label>

                <label>
                    Time
                    <StyledField name="time" placeholder="Quiz time..." type="number" />
                    <StylesError name="time" component="div" />
                </label>

                <label>
                    Questions
                    <StyledField name="question" type="number" />
                    <StylesError name="question" component="div" />
                </label>

                <button type="submit">Submit</button>
            </StyledForm>
        </Formik>
    )
}
