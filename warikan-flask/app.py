from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    result = ""
    if request.method == "POST":
        try:
            price = float(request.form["price"])
            people = int(request.form["people"])
            if people <= 0:
                result = "人数は1以上にしてください。"
            else:
                per = price / people
                result = f"1人、{per:.2f}円です。"
        except:
            result = "入力に問題があります。"
    return render_template("index.html", result=result)

if __name__ == "__main__":
    app.run(debug=True)