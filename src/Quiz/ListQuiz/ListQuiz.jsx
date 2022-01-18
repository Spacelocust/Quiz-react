import React from "react";
import { useRecoilValue } from "recoil";
import { Container, ListGroup } from "react-bootstrap";

import { listState } from "../atomListState";
import Quiz from "./Quiz";

const ListQuiz = () => {
    const listQuiz = useRecoilValue(listState);
    return (
        <Container className='mt-5'>
            <h2>Liste des quizz</h2>
            {listQuiz && <ListGroup>
                {
                    listQuiz.map(quiz => (
                        <Quiz key={quiz.id} Quiz={quiz} />
                    ))
                }
            </ListGroup>}
        </Container>
    );
}

export default ListQuiz;