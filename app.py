from flask import Flask, request, render_template
import numpy as np
import pandas as pd
from xgboost import XGBRegressor

app = Flask(__name__)

# Load the trained model
model = XGBRegressor()
model.load_model("student_grade_model.json")

# Store student scores temporarily
student_scores = {}

@app.route("/")
def home():
    return render_template("quiz.html", student_scores=student_scores)

@app.route("/quiz_g1")
def quiz_g1():
    return render_template("quiz_g1.html")

@app.route("/quiz_g2")
def quiz_g2():
    return render_template("quiz_g2.html")

@app.route("/submit_g1", methods=["POST"])
def submit_g1():
    score = sum([1 for key in request.form if request.form[key] in ["8", "6"]]) * 10  # Example scoring
    student_scores["G1"] = score
    return render_template("quiz.html", student_scores=student_scores)

@app.route("/submit_g2", methods=["POST"])
def submit_g2():
    score = sum([1 for key in request.form if request.form[key] in ["3", "18"]]) * 10  # Example scoring
    student_scores["G2"] = score
    return render_template("quiz.html", student_scores=student_scores)

@app.route("/predict", methods=["POST"])
def predict():
    if "G1" not in student_scores or "G2" not in student_scores:
        return "Complete both quizzes first."

    user_input = [
        float(request.form["studytime"]),
        float(request.form["absences"]),
        student_scores["G1"],
        student_scores["G2"],
        float(request.form["failures"]),
        float(request.form["goout"]),
        float(request.form["health"])
    ]

    user_input = np.array(user_input).reshape(1, -1)
    predicted_grade = model.predict(user_input)[0]
    predicted_percentage = (predicted_grade / 20) * 100

    if predicted_grade < 10:
        category = "⚠️ Below Average (Needs Improvement)"
        course = "Basic Study Skills & Time Management"
    elif 10 <= predicted_grade < 15:
        category = "🙂 Average (Can Improve)"
        course = "Intermediate Learning Strategies"
    else:
        category = "🚀 Above Average (Doing Great!)"
        course = "Advanced Enrichment Program"
    
    return render_template("quiz.html", 
                           prediction=f"Predicted Final Grade: {predicted_percentage:.2f} / 100", 
                           category=category, 
                           course=course, 
                           student_scores=student_scores)

if __name__ == "__main__":
    app.run(debug=True)
