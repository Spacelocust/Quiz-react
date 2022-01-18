import { atom, selector, selectorFamily } from "recoil";
import axios from "axios";


export const listState = atom({
    key: 'AtomListState',
    default: [
        {
            id: 1,
            title: "quizz 1",
            questions: [
                {
                    title: "question 1",
                    answer: 1,
                    choices: [
                        "answer 1",
                        "answer 2",
                        "answer 3",
                        "answer 4",
                    ]
                },
                {
                    title: "question 2",
                    answer: 3,
                    choices: [
                        "answer 1",
                        "answer 2",
                        "answer 3",
                        "answer 4",
                    ]
                },
                {
                    title: "question 3",
                    answer: 2,
                    choices: [
                        "answer 1",
                        "answer 2",
                        "answer 3",
                        "answer 4",
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "quizz 2",
            questions: [
                {
                    title: "question 2",
                    answer: 2,
                    choices: [
                        "answer 1",
                        "answer 2",
                        "answer 3",
                        "answer 4",
                    ]
                }
            ]
        }
    ],
});

export const oneQuizState = selectorFamily({
    key: 'SelectQuizState',
    get: (id) => ({ get }) => {
        const listQuiz = get(listState);
        return listQuiz.find((quiz) => quiz.id === id);
    }
});

//TODO Mettre en place l'API
export const selectListState = selector({
    key: 'CurrentListState',
    get: async () => {
        try {
            const { data } = await axios.get(`http://localhost:3004/quizz`);
            return data;
        } catch (e) {
            console.log(e)
        }
    },
});
