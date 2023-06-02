import React, {useState, useEffect} from 'react';
import styles from '../styles/Quiz.module.scss';
import Header from "../src/Header";

const questions = [
    {
        question: 'What is the capital of France?',
        choices: ['London', 'Paris', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
    },
    {
        question: 'Who painted the Mona Lisa?',
        choices: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
        correctAnswer: 'Leonardo da Vinci',
    },
    {
        question: 'What is the largest planet in our solar system?',
        choices: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
        correctAnswer: 'Jupiter',
    },
];

const QuizComponent = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [skippedQuestions, setSkippedQuestions] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [pzc, setPzc] = useState(false)
    const handleAnswerChange = (e) => {
        const {name, value} = e.target;
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [name]: value,
        }));
    };

    const handleNextQuestion = () => {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    };

    const handleFinishQuiz = () => {
        const unansweredQuestions = questions
            .map((_, index) => index)
            .filter(
                (index) =>
                    !selectedAnswers.hasOwnProperty(`answer-${index}`) &&
                    !skippedQuestions.includes(index)
            );

        if (unansweredQuestions.length > 0) {
            setSkippedQuestions(unansweredQuestions);
        } else {
            calculateScore();
            setQuizCompleted(true);
            setSkippedQuestions([]);
        }
        if (unansweredQuestions.length > 0) {
            setPzc(true)
        }
    };

    const calculateScore = () => {
        let updatedScore = 0;

        for (let i = 0; i < questions.length; i++) {
            if (
                questions[i].correctAnswer === selectedAnswers[`answer-${i}`] ||
                skippedQuestions.includes(i)
            ) {
                updatedScore++;
            }
        }

        setScore(updatedScore);
    };

    const handleSkippedQuestion = (questionIndex) => {
        setCurrentQuestion(questionIndex);
        setSkippedQuestions((prevSkippedQuestions) =>
            prevSkippedQuestions.filter((q) => q !== questionIndex)
        );
    };

    const handleClosePopup = () => {
        setSkippedQuestions([]);
    };

    useEffect(() => {
        const unansweredQuestions = questions
            .map((_, index) => index)
            .filter(
                (index) =>
                    !selectedAnswers.hasOwnProperty(`answer-${index}`) &&
                    !skippedQuestions.includes(index)
            );

        if (unansweredQuestions.length === 0) {
            setSkippedQuestions([]);
        }
    }, [selectedAnswers, skippedQuestions]);

    const unansweredQuestions = questions
        .map((_, index) => index)
        .filter(
            (index) =>
                !selectedAnswers.hasOwnProperty(`answer-${index}`) &&
                !skippedQuestions.includes(index)
        );

    if (quizCompleted) {
        return (
            <>
                <Header/>
                <div className={styles.quizContainer}>
                    {skippedQuestions.length > 0 && (
                        <div className={styles.popup}>
                            <div className={styles.popupHeading}>Quiz Finished!</div>
                            <div className={styles.popupMessage}>
                                You have skipped {skippedQuestions.length} question(s) that are waiting for your answer:
                                {skippedQuestions.map((questionIndex) => (
                                    <button
                                        key={questionIndex}
                                        className={styles.unansweredLink}
                                        onClick={() => handleSkippedQuestion(questionIndex)}
                                    >
                                        Question {questionIndex + 1}
                                    </button>
                                ))}
                            </div>
                            <button className={styles.closePopup} onClick={handleClosePopup}>
                                Close
                            </button>
                        </div>
                    )}

                    <div className={styles.score}>
                        Your score: {score} of {questions.length}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header/>
            <div className={styles.quizContainer}>
                <div className={styles.heading}>Question {currentQuestion + 1}</div>
                <div className={styles.question}>{questions[currentQuestion].question}</div>

                <div className={styles.answerChoices}>
                    {questions[currentQuestion].choices.map((choice, index) => (
                        <div key={index} className={styles.answerChoice}>
                            <label className={styles.label}>
                                <input
                                    type="radio"
                                    name={`answer-${currentQuestion}`}
                                    value={choice}
                                    checked={selectedAnswers[`answer-${currentQuestion}`] === choice}
                                    onChange={handleAnswerChange}
                                    className={styles.input}
                                />
                                {choice}
                            </label>
                        </div>
                    ))}
                </div>

                <div className={styles.navigationButtons}>
                    {currentQuestion > 0 && (
                        <button className={styles.button} onClick={handlePreviousQuestion}>
                            Previous
                        </button>
                    )}

                    {currentQuestion < questions.length - 1 && (
                        <button className={styles.button} onClick={handleNextQuestion}>
                            Next
                        </button>
                    )}

                    {currentQuestion === questions.length - 1 && (
                        <button
                            className={styles.button}
                            onClick={handleFinishQuiz}
                            // disabled={unansweredQuestions.length > 0}
                        >
                            Finish
                        </button>
                    )}
                </div>

                {skippedQuestions.length === 0 && score > 0 && (
                    <div className={styles.score}>
                        Your score: {score} of {questions.length}
                    </div>
                )}
                {/*{pzc && (*/}
                {/*    <div>*/}
                {/*        please answer all questions, you have skipped {unansweredQuestions.map((questionIndex)=> `question ${questionIndex+1} `)}*/}
                {/*    </div>*/}
                {/*)}*/}
                <div>
                    {pzc && (
                        <div>
                            Please answer all questions. You have skipped the following question(s):{' '}
                            {unansweredQuestions.map((questionIndex) => (
                                <a
                                    key={questionIndex}
                                    href={`#question-${questionIndex + 1}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSkippedQuestion(questionIndex);
                                    }}
                                >
                                    Question {questionIndex + 1}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default QuizComponent;
