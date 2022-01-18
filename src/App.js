import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

import MakeQuiz from "./Quiz/MakeQuiz/MakeQuiz";
import ListQuiz from "./Quiz/ListQuiz/ListQuiz";
import Quiz from "./Quiz/Quiz/Quiz";

const App = () => {
    return (
        <Router>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="#home">Home</Navbar.Brand>
                    </LinkContainer>
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link >Liste des quiz</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/MakeQuiz">
                            <Nav.Link >Créer un quiz</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route index element={<ListQuiz />} />
                <Route path='/:id' element={<Quiz />} />
                <Route path='/MakeQuiz' element={<MakeQuiz />} />
            </Routes>
        </Router>
    )
}

export default App;
