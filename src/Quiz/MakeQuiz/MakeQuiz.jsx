import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { Button, Container, Form } from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { listState } from "../atomListState";

const MakeQuiz = () => {
    const question = {
        title: '',
        answer: null,
        choices: []
    };

    const numberAnswer = 4;

    const setListQuizState = useSetRecoilState(listState);

    const [newQuiz, setNewQuiz] = useState({
        id: uuid(),
        title: '',
        questions: [],
    })

    const [newQuestion, setNewQuestion] = useState(question)

    const handleNewAnswer = (index, value) => {
        newQuestion.choices.splice(index, 1, value);
    }

    const handleChange = (name, value) => {
        switch (name) {
            case 'question':
                setNewQuestion({ ...newQuestion, title: value });
                break;
            case 'answer':
                setNewQuestion({ ...newQuestion, answer: value });
                break;
            case 'quiz':
                setNewQuiz({ ...newQuiz, title: value });
                break;
        }
    }

    const handleNewQuestion = () => {
        setNewQuiz({ ...newQuiz, questions: [...newQuiz.questions, newQuestion] });
        setNewQuestion(question);
    }

    const handleNewQuiz = (e) => {
        e.preventDefault();
        setListQuizState((oldList) => oldList.concat(newQuiz));
        setNewQuiz({
            id: uuid(),
            title: '',
            questions: [],
        });
    }

    return (
        <Container className='mt-5'>
            <h2>Créer un quiz</h2>
            <Form onSubmit={(e) => handleNewQuiz(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Titre du quiz</Form.Label>
                    <Form.Control type="text" placeholder="Veuillez saisir le titre du quiz" value={newQuiz.title} onChange={(e) => handleChange('quiz', e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <div className='bg-light rounded p-2'>
                        <Form.Label>Ajouter une question</Form.Label>
                        <Form.Control type="text" placeholder="Veuillez saisir la question" value={newQuestion.title} onChange={(e) => handleChange('question', e.target.value)}/>
                        <Form.Label className='mt-3'>Ajouter vos réponses</Form.Label>
                        {
                            [...Array(numberAnswer).keys()].map((nb, index) => (
                                <div key={`${nb + 1}-answer`} className='d-flex align-items-center'>
                                    <Form.Control
                                        className='my-2'
                                        type="text"
                                        placeholder={`Veuillez saisir réponse ${nb + 1}`}
                                        onChange={(e) => handleNewAnswer(index, e.target.value)}
                                    />
                                    <Form.Check
                                        className='mx-2'
                                        type='radio'
                                        name='radio-answer'
                                        id={`${nb + 1}-radio-answer`}
                                        onChange={() => handleChange('answer', (nb + 1))}
                                    />
                                </div>
                            ))
                        }
                        <div>
                            <Button variant="primary" onClick={() => handleNewQuestion()}>Ajouter question +</Button>
                        </div>
                    </div>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button className="mt-3" variant="success" type="submit">
                        Créer quiz
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default MakeQuiz;