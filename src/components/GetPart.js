import React, { useLayoutEffect } from "react";
import IMG from "../assets/Ellipse2.png"
import "../css/GetPart.css"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchUsers } from "../redux/ActionCreators";
import { Loading } from "./Loading";


const Card = (props) => {

    return (
        <div className="card__container">
            <div className="card__content">
                <div>
                    <img className="card__image" src={props.image} alt={props.name} width="70px"></img>
                </div>
                <div className="card__name tooltip">
                    <div className="tooltiptext">{props.name}</div>
                    <div className="card__name__text">{props.name}</div>
                </div>
                <div className="card__body">
                    <div className="card__position tooltip">
                        <div className="tooltiptext">{props.position}</div>
                        {props.position}
                    </div>
                    <div className="card__email tooltip">
                        <div className="tooltiptext">{props.email}</div>
                        {props.email}
                    </div>
                    <div className="card__phone">
                        {props.phone}
                    </div>
                </div>
            </div>

        </div>

    );
}





export const GetPart = () => {
    const [page, incrementPage] = useState(1);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);


    const RenderUsers = ({ users, isLoading }) => {
        const UsersList = [];
        if (users != null || users.length !== 0) {
            users.forEach(user => {
                UsersList.push(
                    <Card
                        key={UsersList.length}
                        name={user.name}
                        image={user.photo}
                        position={user.position}
                        email={user.email}
                        phone={user.phone}
                    />
                );
            });
            if (isLoading) {
                return (
                    <React.Fragment>
                        <div className="cards__container">
                            {UsersList}
                        </div>
                        <Loading />
                    </React.Fragment>

                );
            }
            else {
                return (
                    <React.Fragment>
                        <div className="cards__container">
                            {UsersList}
                        </div>
                    </React.Fragment>
                );
            }
        }
        else {
            return (
                <Loading />
            );
        }
    };

    const fetchMoreUsers = () => {
        dispatch(fetchUsers(page, 6));
        incrementPage(page + 1);
    };


    useEffect(() => {
        fetchMoreUsers();
    }, []);


    const ButtonFetchMoreUsers = ({ nextLink }) => {
        if (nextLink != null) {
            return (
                <React.Fragment>
                    <button className='button' onClick={() => fetchMoreUsers()}>Show more</button>
                </React.Fragment>
            );
        }
        else {
            <React.Fragment>

            </React.Fragment>
        }
    }

    return (
        <div name="users" className="GETpart">
            <h2>Working with GET request</h2>
            <RenderUsers users={users.usersList} isLoading={users.isLoading} />
            <div className="GET__button">
                <ButtonFetchMoreUsers nextLink={users.nextLink} />
            </div>

        </div >



    );
}