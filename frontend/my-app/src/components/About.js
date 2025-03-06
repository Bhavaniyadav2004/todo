import React from 'react';

function About() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center text-primary mb-4">About Our To-Do App</h2>
                            <p className="card-text text-muted">
                                Welcome to <strong>To-Do App</strong>, your simple and efficient task management solution.
                                Whether you're a student, a professional, or just someone who loves staying organized, our app helps you
                                manage your tasks easily.
                            </p>

                            <h5 className="mt-4">🌟 Key Features:</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">✔️ Add, edit, and delete tasks effortlessly.</li>
                                <li className="list-group-item">✔️ Track your progress with ease.</li>
                                <li className="list-group-item">✔️ Simple and user-friendly interface.</li>
                                <li className="list-group-item">✔️ Works seamlessly on all devices.</li>
                            </ul>

                            <h5 className="mt-4">💡 Why Use This App?</h5>
                            <p className="card-text text-muted">
                                In today's fast-paced world, keeping track of your daily tasks can be overwhelming. 
                                Our To-Do App offers a clean, intuitive interface that allows you to stay organized and 
                                focus on what matters most.
                            </p>

                            <h5 className="mt-4">📞 Contact Us</h5>
                            <p className="card-text text-muted">
                                Have feedback or suggestions? We’d love to hear from you! Reach out to us at <a href="mailto:support@todoapp.com">support@todoapp.com</a>.
                            </p>

                            <div className="text-center mt-4">
                                <button className="btn btn-primary" onClick={() => window.history.back()}>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
