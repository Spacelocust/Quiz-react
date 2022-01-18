import React, { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import history from 'history/browser';
import { useRecoilValue } from "recoil";

import { oneQuizState } from "../atomListState";
import ProgressCounterBar from "./ProgressCounterBar";

const Quiz = () => {
    const params = useParams();
    const quiz = useRecoilValue(oneQuizState(parseInt(params.id) || params.id));
    const timeDefault = 30;

    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [counter, setCounter] = useState(timeDefault);

    const handleNextQuestion = (choice) => {
        quiz.questions[currentQuestion].answer === choice && setScore(score + 10);
        setCurrentQuestion(currentQuestion + 1)
        setCounter(timeDefault);
    }

    useEffect(() => {
        let timer = counter > -1 && setInterval(() => setCounter(counter - 1), 1000);

        history.listen(() => {
            clearInterval(timer);
        });

        if (counter === -1) {
            setCurrentQuestion(currentQuestion + 1);
            if (currentQuestion < quiz.questions.length) {
                setCounter(timeDefault);
            }
        }

        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            { quiz ? <Container className="mt-5">
                <h2>{ quiz.title }</h2>
                { currentQuestion < quiz.questions.length && <ProgressCounterBar counter={counter} time={timeDefault} />}
                { currentQuestion < quiz.questions.length ?
                    <div className="bg-secondary rounded p-3 text-light">
                        <h3 className="text-center mb-2">{ quiz.questions[currentQuestion].title }</h3>
                        <Container className="bg-light rounded p-3 text-light">
                            <Row>
                                {
                                    quiz.questions[currentQuestion].choices.map((choice, index) => (
                                        <Col key={choice} md={6} className="mb-3 d-flex justify-content-center">
                                            <Button className="ml-5" onClick={() => handleNextQuestion(index + 1)}>{ choice }</Button>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Container>
                    </div>
                    : <div>
                        <span>Votre score est de : {score} pts</span>
                        <LinkContainer to={`/`}>
                            <Button variant='primary' className='m-1'>Retour à la liste</Button>
                        </LinkContainer>
                        <ListGroup>
                            {
                                quiz.questions.map((question) => (
                                    <ListGroup.Item key={question}>
                                        { question.title }
                                        {
                                            question.choices.map((choice, index) => (
                                                <ListGroup.Item key={choice + '-' + question} className={index + 1 === question.answer ? 'text-success' : 'text-danger'}>
                                                    { choice }
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </div>
                }
            </Container> : <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '2rem' }}>404</div>}
        </>
    )
}

export default Quiz;