import React from "react";
import { useSetRecoilState } from "recoil";
import { Button, ListGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

import { listState } from "../atomListState";

const Quiz = ({ Quiz }) => {
    const setListQuizState = useSetRecoilState(listState);

    const handleDelete = (id) => {
        setListQuizState((oldList) => oldList.filter((item) => item.id !== id));
    }

    return (
        <>
            {
                Quiz && <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <p className='m-0'>{ Quiz.title }</p>
                    <span>
                        <LinkContainer to={`/${Quiz.id}`}>
                            <Button variant='primary' className='m-1'>Try</Button>
                        </LinkContainer>
                        <Button variant='danger' onClick={() => handleDelete(Quiz.id)}>Delete</Button>
                    </span>
                </ListGroup.Item>
            }
        </>
    );
}

export default Quiz;