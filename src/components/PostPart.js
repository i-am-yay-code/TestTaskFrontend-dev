import "../css/PostPart.css"
import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useState, useEffect } from "react";
import { postRegistration, fetchToken } from "../redux/ActionCreators";
import { useDispatch, useSelector } from "react-redux/es/exports";
import SuccessImage from '../assets/success-image.svg'



export const PostPart = () => {

    const [fileName, setfileName] = useState("Upload your photo");
    const { register, formState: { errors }, handleSubmit } = useForm({ criteriaMode: "all" });
    const dispatch = useDispatch();
    const registrationState = useSelector(state => state.registration);


    useEffect(() => {
        dispatch(fetchToken());
    }, []);

    const sendData = data => {
        let fileField = document.querySelector('input[type="file"]');
        console.log(data);
        const formData = new FormData();
        formData.append('position_id', data.position);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.tel);
        formData.append('photo', fileField.files[0]);
        console.log(formData);


        let token = registrationState.token
        if (token !== null) {
            dispatch(postRegistration(formData, token));
        }

    }


    const handleFileInput = event => {
        let fileName = event.target.value.replace("C:\\fakepath\\", '')
        setfileName(fileName);
    }

    const validatePhoneNumber = number => {
        let regex = /^(?:\+38)?(0\d{9})$/;

        if (regex.test(number)) {
            return true
        } else {
            return false
        }
    }

    if (registrationState.success) {
        return (
            <div className="post__container">
                <h2>User successfully registered</h2>
                <img className="post__success__image" src={SuccessImage} alt="Success Image"></img>
            </div>
        );
    }
    else {
        return (

            <div className="post__container" name='signUp'>
                <h2 >Working with POST request</h2>
                <form onSubmit={handleSubmit(sendData)}>
                    <div className="post__inputs">
                        <input type={'text'} id="name" name="name" placeholder="Your name" {...register('name', {
                            required: "Please, enter your name",
                            minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters"
                            },
                            maxLength: {
                                value: 60,
                                message: "Name can not include more than 60 characters"
                            }
                        })} />
                        <ErrorMessage
                            errors={errors}
                            name='name'
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p className="error__text" key={type}>{message}</p>
                                ))
                            } />

                        <input type={'email'} id='email' name="email" placeholder="Email" {...register("email", {
                            required: "Please, enter your name",
                            minLength: {
                                value: 3,
                                message: "email must be at least 2 characters"
                            },

                            pattern: {
                                value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                                message: "Please, enter valid email"
                            }

                        })}></input>
                        <ErrorMessage
                            errors={errors}
                            name='email'
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p className="error__text" key={type}>{message}</p>
                                ))
                            } />



                        <input type={'tel'} id='tel' name='tel' placeholder="Phone" {...register("tel", {
                            required: "Please, enter your phone number",
                            minLength: {
                                value: 9,
                                message: "Phone must be at least 2 characters"
                            },
                            maxLength: {
                                value: 16,
                                message: "Phone can not include more than 16 characters"
                            },
                            validate: {
                                positive: value => validatePhoneNumber(value) || "Please, enter your number in the international format:\n+380123456789"
                            }
                        })}></input>

                        <ErrorMessage
                            errors={errors}
                            name='tel'
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p className="error__text" key={type}>{message}</p>
                                ))
                            } />


                        <div className="post__inputs__position">
                            <label className="post__inputs__label">Select your position</label>
                            <div>
                                <input className="post__radio" type="radio" id="Security"
                                    name="position" value={1} defaultChecked
                                    {...register("position", { required: true })}
                                ></input>
                                <label htmlFor="Security">Security</label>
                            </div>
                            <div>
                                <input className="post__radio" type="radio" id="BackEnd"
                                    name="position" value={2}
                                    {...register("position", { required: true })}
                                ></input>
                                <label htmlFor="Designer">Designer</label>

                            </div>
                            <div>
                                <input className="post__radio" type="radio" id="Content manager"
                                    name="position" value={3}
                                    {...register("position", { required: true })}
                                ></input>
                                <label htmlFor="Content manager">Content manager</label>
                            </div>
                            <div>
                                <input className="post__radio" type="radio" id="Lawyer"
                                    name="position" value={4}
                                    {...register("position", { required: true })}
                                ></input>
                                <label htmlFor="Lawyer">Lawyer</label>
                            </div>
                        </div>
                        <label className="post__photo">
                            <input className="post__photo__input" type={'file'} name='photo' id='photo' accept="image/jpg, image/jpeg"
                                {...register("photo", {
                                    required: "Please, send us your photo",
                                    validate: {
                                        lessThan10MB: files => files[0]?.size < 5000000 || 'Max size is 5MB',
                                        acceptedFormats: files =>
                                            ['image/jpeg', 'image/jpg'].includes(
                                                files[0]?.type
                                            ) || 'Only JPEG and JPG format allowed',

                                    }
                                })}
                                onChange={handleFileInput}
                                filename={fileName}
                            />
                            <div className="post__photo__container">
                                <div className="post__photo__upload">Upload</div>
                                <div className="post__photo__text">{fileName}</div>
                            </div>
                        </label>
                        <ErrorMessage
                            errors={errors}
                            name='photo'
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p className="error__text" key={type}>{message}</p>
                                ))
                            } />
                    </div>
                    <div className="post__button__container">
                        <button className='button signup' type="submit">Sign up</button>
                    </div>
                </form >
            </div >
        );
    }
}