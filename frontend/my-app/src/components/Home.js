import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
        <div className="container mt-5">
            {/* Hero Section */}
            <header className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary">Welcome to To-Do App</h1>
                <p className="lead">Organize your tasks efficiently with our easy-to-use task management system.</p>
            </header>

            {/* Features Section */}
            <section className="row text-center">
                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Create Tasks</h5>
                            <p className="card-text">Add new tasks easily with simple inputs and reminders.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Track Progress</h5>
                            <p className="card-text">Monitor your daily, weekly, and monthly tasks at a glance.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Stay Organized</h5>
                            <p className="card-text">Categorize tasks by priority, deadlines, and projects.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="my-5">
                <h2 className="text-center mb-4 text-success">About Our To-Do App</h2>
                <p className="text-muted text-center">
                    Our To-Do App is designed to help you manage your daily tasks efficiently.
                    Whether you're planning your work day, personal goals, or collaborative projects,
                    our app keeps everything organized and accessible.
                </p>
            </section>

            {/* Call to Action Section */}
            <section className="text-center my-5">
                <h3 className="mb-3">Get Started Now!</h3>
                <p className="text-muted">Login or Sign Up to start managing your tasks today.</p>
                <a href="/signup" className="btn btn-primary me-2">Sign Up</a>
                <a href="/login" className="btn btn-outline-primary">Login</a>
            </section>
        </div>
    );
}

export default Home;
